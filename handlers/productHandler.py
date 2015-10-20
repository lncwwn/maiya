#!/usr/bin/python
# -*- coding: utf-8 -*-
#
# author victor li nianchaoli@msn.cn
# date 2015/10/17

import baseHandler
from modules.db import db

"""
get the products list
@return products list
"""
class ListHandler(baseHandler.RequestHandler):

    def get(self):
        query = 'select id, name, inventory, title from product where active = 1'
        products = db.query(query)

        self.render('index.html', products=products)
