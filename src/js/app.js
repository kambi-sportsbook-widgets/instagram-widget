(function () {
   'use strict';

   var InstagramWidget = CoreLibrary.Component.subclass({

      defaultArgs: {
         instagramUrl: 'https://www.instagram.com/p/BARTu05AvwB'
      },

      constructor () {
         CoreLibrary.Component.apply(this, arguments);
      },

      init () {
         window.instagramCallback = (data) => {
            this.pictureWidth = data.thumbnail_width;
            this.pictureHeight = data.thumbnail_height;
            this.setHeight();
         };
         var instagramApiUrl = '//api.instagram.com/publicapi/oembed/?url=';
         instagramApiUrl += this.scope.args.instagramUrl;
         instagramApiUrl += '/&callback=instagramCallback';

         var script = document.createElement('script');
         script.setAttribute('src', instagramApiUrl);
         document.head.appendChild(script);

         this.kwcard = document.querySelector('.kw-card');
         this.instagramHeaderFooter = 88;

         window.addEventListener('resize', () => {
            this.setHeight();
         });

         var iframeUrl = this.scope.args.instagramUrl;
         if (iframeUrl.indexOf('/embed') < -5) {
            this.scope.iframeUrl = iframeUrl;
         } else {
            this.scope.iframeUrl = iframeUrl + '/embed/';
         }
      },

      setHeight () {
         CoreLibrary.widgetModule.setWidgetHeight(
            (this.pictureHeight / this.pictureWidth) *
            this.kwcard.offsetWidth + this.instagramHeaderFooter);
      }

   });

   var instagramWidget = new InstagramWidget({
      rootElement: 'html'
   });

})();
