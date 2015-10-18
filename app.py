import tornado.ioloop
import tornado.web
from settings import settings
from urls import urls

if __name__ == '__main__':
    application = tornado.web.Application(urls, **settings)
    application.listen(8866)
    print 'server started and listening on port 8866...'
    tornado.ioloop.IOLoop.current().start()
