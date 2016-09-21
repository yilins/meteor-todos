/**
 * Created by Administrator on 2016/8/27.
 */
Template.tasksList.onRendered(function () {
    this.find('.wrapper')._uihooks = {
        insertElement: function (node, next) {
            $(node)
                .hide()
                .insertBefore(next)
                .fadeIn();
        },
        moveElement: function (node, next) {
            var $node = $(node), $next = $(next);
            var oldTop = $node.offset().top;
            var height = $node.outerHeight(true);

            var $inBetween = $next.nextUntil(node);
            if ($inBetween.length === 0)
                $inBetween = $node.nextUntil(next);

            $node.insertBefore(next);

            var newTop = $node.offset().top;

            $node
                .removeClass('animate')
                .css('top', oldTop - newTop);

            $inBetween
                .removeClass('animate')
                .css('top', oldTop < newTop ? height : -1 * height);

            $node.offset();

            // 动画，重置所有元素的 top 坐标为 0
            $node.addClass('animate').css('top', 0);
            $inBetween.addClass('animate').css('top', 0);
        },
        removeElement: function(node) {
            $(node).fadeOut(function() {
                $(this).remove();
            });
        }
    }
});
Template.tasksList.events({
    'click #taskStart': function(e) {
        e.preventDefault();
        dailyData();
        Router.go('todoList');
    }
});