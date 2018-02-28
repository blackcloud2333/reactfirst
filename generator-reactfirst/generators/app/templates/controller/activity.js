exports.index = function* index(ctx) {
    yield this.render('activitypinganrecruit:page/pc/index/index.tpl', {
        title: '决战！平安京--主播招募!',
        mredirect:'https://www.quanmin.tv/act/m/pinganrecruit'
    });
};
exports.m_index = function* m_index(ctx) {
    yield this.render('activitypinganrecruit:page/m/index/index.tpl', {
        title: '决战！平安京--主播招募!'
    });
};