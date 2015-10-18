import handlers.baseHandler as base

urls = [
    #(r'/', main.MainHandler),
    (r'.*', base.RequestHandler),
]
