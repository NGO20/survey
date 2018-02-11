/**
 * Created by Administrator on 2018/1/16.
 */
layui.use(['layer', 'form'], function(){
    var $ = layui.$;
    var layer = layui.layer;

    function enableInputSuggesion () {
        var suggesionElem = $('<div class="layui-form-select" style="position:absolute;display:none;">' +
            '<dl class="layui-anim layui-anim-upbit" style="display: block;width:250px;">' +
            '</dl>' +
        '</div>').appendTo(document.body);
        var curInputElem = null, highlightItemIndex = -1, isShowing = false, lastQuery = null, querySuggesstionTimer = null;
        function showSuggestion(inputElem) {
            curInputElem = inputElem;
            suggesionElem.show();
            isShowing = true;
            var top = $(inputElem).offset().top;
            var left = $(inputElem).offset().left;
            suggesionElem.offset({top:top, left:left});
            suggesionElem.width($(inputElem).width);
        }

        function stopEvent(e) {
            return e.preventDefault(), e.stopPropagation();
        }

        function hideSuggestion() {
            curInputElem = null;
            isShowing = false;
            highlightItemIndex = -1;
            suggesionElem.hide();
            clearTimeout(querySuggesstionTimer);
        }

        function removeHighlightSuggestionItem() {
            suggesionElem.find('dd').eq(highlightItemIndex).attr('style', '');
        }

        function highlightSuggestionItem() {
            suggesionElem.find('dd').eq(highlightItemIndex).attr('style', 'background:#f2f2f2');
        }

        function hilightSuggestionItemByArrowKey(isDownKey) {
            var count = suggesionElem.find('dd').length;
            if (count == 0) return;
            removeHighlightSuggestionItem();
            if (isDownKey) {
                highlightItemIndex++;
            } else {
                highlightItemIndex += count -  highlightItemIndex == -1 ? 0 : 1;
            }
            highlightItemIndex = highlightItemIndex % count;
            highlightSuggestionItem();
            $(curInputElem).val(suggesionElem.find('dd').eq(highlightItemIndex).text());
        }

        function querySuggestions(keyword) {
            $.get('/api/querySuggestions?key=' + keyword).then(function (data) {
                var suggestions = data.suggestions, html = '';
                for (var i = 0; i < suggestions.length; i++) {
                    html += '<dd>' + suggestions[i] + '</dd>';
                }
                suggesionElem.find('dl').html(html);
                highlightItemIndex = -1;
            }, function () {
                hideSuggestion();
            })
        }

        $('.input-suggestion').on('keydown', function (e) {
            if (27 == e.keyCode || 13 == e.keyCode) {
                hideSuggestion();
            } else if (isShowing && (e.keyCode == 38 || e.keyCode == 40)) {
                hilightSuggestionItemByArrowKey(e.keyCode == 38);
                stopEvent(e);
            }
        })

        suggesionElem.on('mouseover', 'dd', function(){
            var curItemIndex = $(this).index();
            if(highlightItemIndex != curItemIndex) {
                removeHighlightSuggestionItem();
                highlightItemIndex = curItemIndex;
                highlightSuggestionItem();
            }
        })

        suggesionElem.on('mousedown', 'dd', function () {
            var curItemIndex = $(this).index();
            $(curInputElem).val(suggesionElem.find('dd').eq(curItemIndex).text());
            hideSuggestion();
        })

        $('.input-suggestion').on('input', function (e) {
            if(!isShowing) {
                showSuggestion(this);
                lastQuery = null;
            }
            if (this.value && this.value != lastQuery) {
                clearTimeout(querySuggesstionTimer);
                lastQuery = this.value;
                querySuggesstionTimer = setTimeout(function () {
                    querySuggestions(lastQuery);
                }, 300);
            }

        })

        $('.input-suggestion').on('blur', function () {
            hideSuggestion();
        })

    }
    enableInputSuggesion();

    function monitorChecking() {
        function uncheck(elem) {
            elem.removeClass('layui-form-checked');
            elem.siblings('input').prop('checked', false);
        }
        $('.limit-checkbox-gruop').on('click', 'li > div', function() {
            var self = $(this),
                checkGroupElem = self.closest('.limit-checkbox-gruop');
            var limit = checkGroupElem.data('check-limit');
            var count = checkGroupElem.find('.layui-form-checked').length;
            if(count > limit) {
                layer.tips('已经超过选择数目。', this);
                uncheck(self);
            }
        })

        $('.mutex-checkbox-group').on('click', 'li > div', function() {
            var self = $(this),
                inputElem = self.siblings('input'),
                checkGroupElem = self.closest('.mutex-checkbox-group');
            if(inputElem.hasClass('mutex-checkbox')) {
                checkGroupElem.find('li > div').each(function(i, elem) {
                    if (elem != self.get(0)) uncheck($(elem));
                })
            } else {
                uncheck(checkGroupElem.find('input.mutex-checkbox').siblings('div').first());
            }
        })
    }
    monitorChecking();

    var regExp = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    layui.form.verify({
        checkGroup: function(value, item) {
            if ( $(item).find('.layui-form-radioed').length == 0 && $(item).find('.layui-form-checked').length == 0) {
                $(item).addClass('checkbox-group-danger');
                $('html, body').animate({
                    scrollTop: ($('.checkbox-group-danger').first().offset().top)
                },50);
                return '题目未填选'
            }
        },
        website: function(value, item) {
            if (!value) return '官方网址不能为空';
            if (value == '0' || value.match(regExp)) return;
            return '官方网址不正确';
        },
	tel: function(value, item) {
           var telReg = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
           if (value && value.toString().match(telReg)) return;
           return '号码格式不正确';
       }
    })

    $('form').on('click', '.checkbox-group-danger', function () {
        $(this).removeClass('checkbox-group-danger');
    })

    function refreshCompositeQuestion(questionElem, trigerStr) {
        var radioElem = questionElem.find('.layui-form-radioed');
        if (radioElem.length == 0) return;
        if (radioElem.text().indexOf(trigerStr) < 0) {
            $(this).find('input[type=text]').prop('lay-verify', 'required');
            $('.subquestion').each(function(i, elem) {
                var self = $(elem);
                if (self.hasClass('mutex-checkbox-group')) {
                    self.attr('lay-verify', 'checkGroup');
                } else {
                    self.find('input[type=text]').attr('lay-verify', 'required');
                }
                self.show();
            })
        } else {
            $(this).find('input[type=text]').removeProp('lay-verify');
            $('.subquestion').each(function(i, elem) {
                var self = $(elem);
                if (self.hasClass('mutex-checkbox-group')) {
                    self.removeAttr('lay-verify');
                } else {
                    self.find('input[type=text]').removeAttr('lay-verify');
                }
                self.hide();
	    })
       }
    }

    
    refreshCompositeQuestion($('.composite-question'), '未发起众筹项目');
    $('.composite-question').on('click', function () {
        refreshCompositeQuestion($(this), '未发起众筹项目');
    });
});
