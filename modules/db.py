from settings import database
import torndb

db = torndb.Connection(database['host'], database['database'], database['user'], database['password'])
