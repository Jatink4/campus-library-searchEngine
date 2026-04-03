import asyncpg
from elasticsearch import AsyncElasticsearch

class DB:

    uri: str
    pool: None

    def insert (self, query: str, *args):
        pass
   
    def query (self, query: str, *args):
        pass

class PostgresDB(DB):

    def __init__(self, uri: str):
        self.uri = uri
        self.pool = None

    async def connect(self):
        self.pool = await asyncpg.create_pool(
            dsn=self.uri,
            min_size=1,
            max_size=10
        )

    async def query(self, query: str, *args):
        async with self.pool.acquire() as connection:
            return await connection.fetch(query, *args)
        
    async def execute(self, query: str, *args):
        async with self.pool.acquire() as connection:
            await connection.execute(query, *args)
                   
class SearchDB(DB):

    client = None

    def __init__(self, uri:str ):
        self.uri = uri
        self.client = None
        
    async def connect(self):
        try:
            self.client = AsyncElasticsearch(self.uri)
            resp = await self.client.ping()
            print(f"Elasticsearch connected: {resp}")
        except Exception as e:
            print(f"Error connecting to Elasticsearch: {e}")

    async def insert(self, index: str, document: dict):
        await self.client.index(index=index, body=document)

    async def query(self, index: str, query: dict, *args, **kwargs):
        response = await self.client.search(index=index, body=query, *args, **kwargs)
        return response['hits']['hits']