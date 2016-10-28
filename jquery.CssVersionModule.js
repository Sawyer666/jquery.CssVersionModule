;
(function ($) {

    function CookieTools(_document) {
        this.element = _document;
    }

    CookieTools.prototype.initCookie = function (name, value) {
        var cookie_string = name + "=" + escape(value) + ";";
        this.element[0].cookie = cookie_string;
    }

    CookieTools.prototype.deleteCookie = function (cookie_name) {
        var results = this.element[0].cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
        if (results) {
            var cookie_date = new Date(); // Текущая дата и время
            cookie_date.setTime(cookie_date.getTime() - 1);
            this.element[0].cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
        };
    }

    CookieTools.prototype.getCookie = function (cookie_name) {
        var results = this.element[0].cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
        if (results)
            return (unescape(results[2]));
        else
            return null;
    }


    function CssTools(element) {
        this.element = element;

        this.cookie_tools = new CookieTools(element);
        this._url_main_css = 'http://dou25spb.ru/wp-content/themes/BootstrapTheme/style.css';
        this._url_main_Eyes_css = 'http://dou25spb.ru/wp-content/themes/BootstrapTheme/styleEyes.css';
        this._cookie_default = "cookie_css";
        this._cookieEyesVersion = "cookieEyes";
    }

    CssTools.prototype.initStyle = function () {
        var obj_css = {};
        if (this.cookie_tools.getCookie(this._cookie_default) == null && this.cookie_tools.getCookie(this._cookieEyesVersion) == null) {
            obj_css.link = "Версия для слабовидящих";
            obj_css.mainCss = this._url_main_css;

        } else if (this.cookie_tools.getCookie(this._cookieEyesVersion) != null) {
            obj_css.link = "Обычная Версия";
            obj_css.mainCss = this._url_main_Eyes_css;

        } else if (this.cookie_tools.getCookie(this._cookie_default) != null) {
            obj_css.link = "Версия для слабовидящих";
            obj_css.mainCss = this._url_main_css;
        }
        this.SetCss(obj_css);
    }

    CssTools.prototype.checkStyle = function (_cssHref) {
        var obj_css = {};
        if (_cssHref == this._url_main_css) {
            var res = this.cookie_tools.getCookie("cookie_css");
            if (res) {
                this.cookie_tools.deleteCookie("cookie_css");
            }
            this.cookie_tools.initCookie("cookieEyes", this._url_main_Eyes_css);
            obj_css.link = "Обычная Версия";
            obj_css.mainCss = this._url_main_Eyes_css;
        } else {
            this.cookie_tools.deleteCookie("cookieEyes");
            this.cookie_tools.initCookie("cookie_css", this._url_main_css);
            obj_css.link = "Версия для слабовидящих";
            obj_css.mainCss = this._url_main_css;
        }

        this.SetCss(obj_css);
    }

    CssTools.prototype.getMainHrefString = function (default_css) {
        return this.element.find(default_css).attr('href');
    }

    CssTools.prototype.SetCss = function (_obj_css) {

        this.element.find("#main_css-css").attr('href', _obj_css.mainCss);
        this.element.find("#switcher").text(_obj_css.link);
    }


    function Controller(element) {
        //  console.time('start');
        this.element = element;
        this.element.find("#switcher").text('11');
        this.cssTools = new CssTools(this.element);

        this.loadStyle();
        //    console.timeEnd('start');
    }

    Controller.prototype.loadStyle = function () {

        this.cssTools.initStyle();
    }

    Controller.prototype.handleClick = function (event) {
        //     console.time('start');
        var cssHref = this.cssTools.getMainHrefString(event.data.styleId);
        this.cssTools.checkStyle(cssHref);
        //  console.timeEnd('start');
    }


    var defaults = {
        'link_main_css': '#main_css-css',
        parent: ".header",
        linkCss: "main_css-css"
    };


    function Cssplugin(element, options) {
        this.element = element;
        this.config = $.extend({}, defaults, options);

        this.init();
    }

    Cssplugin.prototype.init = function () {

        var link = $('<a/>', {
                id: 'switcher',
                href: '#'
            })
            .addClass('switch')
            .on('click', {
                styleId: this.config.link_main_css
            }, function (event) {
                controller.handleClick(event);
            })

        .appendTo(this.config.parent);
        var controller = new Controller(this.element);

    }

    $.fn.cssplugin = function (options) {
        new Cssplugin(this, options);
    };

})(jQuery);