import handlers.baseHandler as base
import handlers.mainHandler as main
import handlers.productHandler as product

urls = [
    (r'/', main.MainHandler),
    (r'/products/last', product.ListHandler),
    (r'.*', base.RequestHandler),
]
