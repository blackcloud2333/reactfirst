'use strict';
module.exports = app => {
  app.get(
    '/act/pinganrecruit',
    app.middlewares.global(),
    app.middlewares.mobile(),
    'activitypinganrecruit.activity.index'
  );
  app.get(
    '/act/m/pinganrecruit',
    app.middlewares.global(),
    app.middlewares.mobile(),
    'activitypinganrecruit.activity.m_index'
  );
};
