import logging
from fastapi import HTTPException
from configs.db_config import search_db
import json
from utility.reform_queries import reformulate_query

index_option = {
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 0,
    "max_ngram_diff": 20,
    "analysis": {
      "char_filter": {
        "remove_dots": {
          "type": "pattern_replace",
          "pattern": "\\.",
          "replacement": ""
        },
        "remove_spaces": {
            "type": "pattern_replace",
            "pattern": "\\s+",
            "replacement": ""
        }   ,
      },
      "normalizer": {
        "lowercase_normalizer": {
          "type": "custom",
          "filter": ["lowercase", "asciifolding"]
        }
      },
      "tokenizer": {
        "ngram_tokenizer": {
          "type": "ngram",
          "min_gram": 3,
          "max_gram": 20,
          "token_chars": ["letter"]
        }
      },
      "analyzer": {
        "name_analyzer": {
          "type": "custom",
          "tokenizer": "keyword",
          "char_filter": ["remove_dots","remove_spaces"],
          "filter": ["lowercase", "asciifolding"]
        },
        "ngram_analyzer": {
          "type": "custom",
          "tokenizer": "ngram_tokenizer",
          "char_filter": ["remove_dots"],
          "filter": ["lowercase", "asciifolding"]
        },
        "standard_lower": {
          "type": "custom",
          "tokenizer": "standard",
          "char_filter": ["remove_dots"],
          "filter": ["lowercase", "asciifolding"]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "id": { "type": "integer" },

      "title": {
        "type": "text",
        "analyzer": "standard_lower",
        "fields": {
          "ngram": {
            "type": "text",
            "analyzer": "ngram_analyzer"
          }
        }
      },

      "description": {
        "type": "text",
        "analyzer": "standard_lower"
      },

      "publisher": {
        "type": "keyword",
        "normalizer": "lowercase_normalizer",
        "fields":{
            "text":{
                "type": "text",
                "analyzer": "standard_lower"
            },
            "concat": {
                "type": "text",
                "analyzer": "name_analyzer"
            },
            "ngram":{
                "type": "text",
                "analyzer": "ngram_analyzer"
            }
        }
        },

      "publication_year": { "type": "integer" },

      "edition": { "type": "keyword" },

      "language": {
        "type": "keyword",
        "normalizer": "lowercase_normalizer"
      },

      "authors": {
        "type": "text",
        "analyzer": "standard_lower",
        "fields": {
          "ngram": {
            "type": "text",
            "analyzer": "ngram_analyzer"
          },
          "keyword": {
            "type": "keyword",
            "normalizer": "lowercase_normalizer"
          },
          "concat": {
            "type": "text",
            "analyzer": "name_analyzer"
          }
        }
      },

      "categories": {
        "type": "keyword",
        "normalizer": "lowercase_normalizer",
        "fields": {
          "text": { "type": "text", "analyzer": "standard_lower" },
        }
      },

      "tags": {
        "type": "text",
        "analyzer": "standard_lower",
        "fields": {
          "keyword": { "type": "keyword" },
        }
      },

      "pages": { "type": "integer" },

      "isbn": { "type": "keyword" }
    }
  }
}

class SearchController:

    def __init__(self):
        self.index_name = "books"

    async def init_index(self):
        """Check if the index exists, and create it if it doesn't"""
        exists = await search_db.client.indices.exists(index=self.index_name)
        if not exists:
            logging.info(f"Creating index '{self.index_name}'")
            await search_db.create_index(
                index=self.index_name,
                settings=index_option
            )
        else:
            logging.info(f"Index '{self.index_name}' already exists")

    async def index_book(self, book: dict):
        """Index a single book document in Elasticsearch"""
        response = await search_db.index(
            index=self.index_name,
            id=book["id"],
            document=book
        )
        if response.get("result") not in ["created", "updated"]:
            raise HTTPException(status_code=500, detail="Failed to index book")
        return response

    async def index_books_bulk(self, documents: list):
        """Index multiple book documents in Elasticsearch"""
        if len(documents) == 0:
            raise HTTPException(status_code=400, detail="No documents to index")
        
        response = await search_db.index_bulk(
            index=self.index_name,
            documents=documents
        )

        return {"success_count": len(response["items"]), "error_count": response["errors"]}
    
    async def auto_complete(self, query: str, filters: dict = None):

        filter_clauses = []

        if filters:
            if filters.get("publisher"):
                filter_clauses.append({
                    "term": {
                        "publisher": filters["publisher"].lower()
                    }
                })

            if filters.get("category"):
                filter_clauses.append({
                    "term": {
                        "categories.keyword": filters["category"]
                    }
                })

            if filters.get("tag"):
                filter_clauses.append({
                    "term": {
                        "tags.keyword": filters["tag"]
                    }
                })

            if filters.get("language"):
                filter_clauses.append({
                    "term": {
                        "language.keyword": filters["language"]
                    }
                })

            if filters.get("year_gte") or filters.get("year_lte"):
                range_query = {}
                if filters.get("year_gte"):
                    range_query["gte"] = filters["year_gte"]
                if filters.get("year_lte"):
                    range_query["lte"] = filters["year_lte"]

                filter_clauses.append({
                    "range": {
                        "publication_year": range_query
                    }
                })

        search_query = {
            "bool": {
                "should": [

                {
                    "multi_match": {
                    "query": query,
                    "type": "cross_fields",
                    "fields": [
                        "title",
                        "authors.ngram",
                        "tags",
                        "publisher.ngram"
                    ]
                    }#this is the main clause for auto-complete else are for boosting exact matches
                },

                {
                    "multi_match": {
                    "query": query,
                    "type": "bool_prefix",
                    "fuzziness": "AUTO",
                    "fields": [
                        "title",
                        "authors.ngram",
                        "authors",
                        "publisher.text",
                        "tags",
                        "publisher.ngram"
                    ]
                    }
                },

                {
                    "match": {
                    "publisher.concat": {
                        "query": query,
                        "boost": 5
                    }
                    }
                },

                {
                    "match": {
                    "authors.concat": {
                        "query": query,
                        "boost": 6
                    }
                    }
                },

                {
                    "multi_match": {
                    "query": query,
                    "fields": [
                        "authors^3",
                        "title.ngram^2",
                        "publisher.text^2"
                    ]
                    }
                }

                ],
                "minimum_should_match": 1,
                "filter": filter_clauses
            }
            }
        # print(filter_clauses)
        response = await search_db.search(
            index=self.index_name,
            query=search_query
        )

        if(response.get("hits") is None):
            raise HTTPException(status_code=500, detail="Search query failed")
        

        return response["hits"]["hits"]
    
    async def search(self, query: str, filters: dict = None):
        filter_clauses = []

        if filters:
            if filters.get("publisher"):
                filter_clauses.append({
                    "term": {
                        "publisher": filters["publisher"].lower()
                    }
                })

            if filters.get("category"):
                filter_clauses.append({
                    "term": {
                        "categories.keyword": filters["category"]
                    }
                })

            if filters.get("tag"):
                filter_clauses.append({
                    "term": {
                        "tags.keyword": filters["tag"]
                    }
                })

            if filters.get("language"):
                filter_clauses.append({
                    "term": {
                        "language.keyword": filters["language"]
                    }
                })

            if filters.get("year_gte") or filters.get("year_lte"):
                range_query = {}
                if filters.get("year_gte"):
                    range_query["gte"] = filters["year_gte"]
                if filters.get("year_lte"):
                    range_query["lte"] = filters["year_lte"]

                filter_clauses.append({
                    "range": {
                        "publication_year": range_query
                    }
                })


        [keyword_query, variants, cleaned_query] = reformulate_query(query)

        print("Keyword Query:", keyword_query)
        print("Variants:", variants)
        print("Cleaned Query:", cleaned_query)

        search_query = {
            "bool": {
                "must": [],
                "should": [],
                "filter": filter_clauses
            }
        }

        # ---- 1. KEYWORD CLAUSES (IMPORTANT SIGNALS) ----
        for key, values in keyword_query.items():
            if not values:
                continue

            for value in values:
                if key == "author":
                    search_query["bool"]["should"].append({
                        "match": {
                            "authors.concat": {
                                "query": value,
                                "boost": 10
                            }
                        }
                    })

                elif key == "publisher":
                    search_query["bool"]["should"].append({
                        "match": {
                            "publisher.concat": {
                                "query": value,
                                "boost": 8
                            }
                        }
                    })

                elif key == "edition":
                    search_query["bool"]["should"].append({
                        "term": {
                            "edition": {
                                "value": value,
                                "boost": 5
                            }
                        }
                    })


        # ---- 2. MAIN QUERY (CLEANED QUERY) ----
        if cleaned_query:
            search_query["bool"]["must"].append({
                "multi_match": {
                    "query": cleaned_query,
                    "type": "best_fields",
                    "fields": [
                        "title^5",
                        "authors^3",
                        "tags^2",
                        "publisher^2"
                    ],
                    "fuzziness": "AUTO"
                }
            })


        # ---- 3. VARIANTS (IMPORTANT FOR YOUR CONCAT / EDGE NGRAM) ----
        for v in variants[:5]:  # limit to avoid explosion
            search_query["bool"]["should"].append({
                "multi_match": {
                    "query": v,
                    "fields": [
                        "title",
                        "authors.concat",
                        "publisher.concat"
                    ],
                    "boost": 2
                }
            })


        # ---- 4. ISBN EXACT MATCH ----
        search_query["bool"]["should"].append({
            "term": {
                "isbn.keyword": {
                    "value": query,
                    "boost": 20
                }
            }
        })


        # ---- 5. DESCRIPTION (LOW IMPORTANCE) ----
        search_query["bool"]["should"].append({
            "match": {
                "description": {
                    "query": cleaned_query,
                    "fuzziness": "AUTO",
                    "boost": 0.3
                }
            }
        })

                # ---- 6. RAW QUERY FALLBACK ----
        if query:
            # broad match
            search_query["bool"]["should"].append({
                "multi_match": {
                    "query": query,
                    "fields": [
                        "title^4",
                        "authors^3",
                        "publisher^2"
                    ],
                    "fuzziness": "AUTO",
                    "boost": 1.5
                }
            })

            # exact phrase boost (VERY IMPORTANT)
            search_query["bool"]["should"].append({
                "match_phrase": {
                    "title": {
                        "query": query,
                        "boost": 6
                    }
                }
            })

        # ---- 7. LOW-SCORING FALLBACK CLAUSES (Won't interfere with main results) ----
        # These have very low boost and only activate if main query doesn't match well
        
        # Fallback 1: Search individual parts in tags/categories with low boost
        if cleaned_query:
            parts = cleaned_query.split()
            for part in parts:
                if len(part) > 2:
                    search_query["bool"]["should"].append({
                        "match": {
                            "tags": {
                                "query": part,
                                "boost": 0.2,
                                "fuzziness": "AUTO"
                            }
                        }
                    })
                    search_query["bool"]["should"].append({
                        "match": {
                            "categories.text": {
                                "query": part,
                                "boost": 0.15,
                                "fuzziness": "AUTO"
                            }
                        }
                    })
        
        # Fallback 2: Broad description search with very low boost
        if cleaned_query:
            search_query["bool"]["should"].append({
                "multi_match": {
                    "query": cleaned_query,
                    "fields": ["description"],
                    "fuzziness": 2,
                    "boost": 0.1
                }
            })
        
        # Fallback 3: Search keyword query values across tags/categories
        for key, values in keyword_query.items():
            if values:
                for value in values:
                    if len(value) > 2:
                        search_query["bool"]["should"].append({
                            "multi_match": {
                                "query": value,
                                "fields": ["tags", "categories.text"],
                                "fuzziness": "AUTO",
                                "boost": 0.25
                            }
                        })
        
        # Fallback 4: Ultra-loose fuzzy search on original query (last resort)
        if original_query := query:
            search_query["bool"]["should"].append({
                "multi_match": {
                    "query": original_query,
                    "fields": ["title^0.5", "tags", "categories.text"],
                    "fuzziness": "AUTO",
                    "boost": 0.05
                }
            })

        # ---- 8. OPTIONAL: ENSURE SHOULD HAS EFFECT ----
        if search_query["bool"]["should"]:
            search_query["bool"]["minimum_should_match"] = 1


        response = await search_db.search(
            index=self.index_name,
            query=search_query
        )

        # print(response)
        return response["hits"]["hits"]


search_controller = SearchController()
