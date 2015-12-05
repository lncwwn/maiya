import tornado.ioloop
import tornado.web
from settings import settings
from urls import urls

if __name__ == '__main__':
    application = tornado.web.Application(urls, **settings)
    application.listen(settings['port'])
    print 'server started and listening on port {0}...'.format(settings['port'])
    tornado.ioloop.IOLoop.current().start()
