fis.namespace('activitypinganrecruit');

fis.config.merge({
  roadmap: {
    domain : {
      '**.ttf': '//www.quanmin.tv',
      '**.woff': '//www.quanmin.tv',
      '**.eot': '//www.quanmin.tv',
      '**': '//static.quanmin.tv'
    },
    path: [{
      reg: /^\/public\/(.+)$/i,
      url: '/public/${namespace}/pub/$1',
      release: '/app/public/${namespace}/pub/$1',
      isMod: false
    }]
  }
});
