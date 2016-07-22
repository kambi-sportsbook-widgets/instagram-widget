(function () {
   'use strict';

   var InstagramWidget = CoreLibrary.Component.subclass({

      defaultArgs: {
         widgetTrackingName: 'instagram',
         instagram: {
            href: 'https://www.instagram.com/p/BARTu05AvwB'
         }
      },

      constructor () {
         CoreLibrary.Component.apply(this, arguments);
      },

      init () {
         CoreLibrary.setWidgetTrackingName(this.scope.args.widgetTrackingName);

         window.instagramCallback = (data) => {
            this.pictureWidth = data.thumbnail_width;
            this.pictureHeight = data.thumbnail_height;
            this.setHeight();
         };
         var instagramApiUrl = '//api.instagram.com/publicapi/oembed/?url=';
         instagramApiUrl += this.scope.args.instagram.href;
         instagramApiUrl += '/&callback=instagramCallback';

         var script = document.createElement('script');
         script.setAttribute('src', instagramApiUrl);
         document.head.appendChild(script);

         this.kwcard = document.querySelector('.kw-card');
         this.instagramHeaderFooter = 88;

         window.addEventListener('resize', () => {
            this.setHeight();
         });

         this.scope.iframeUrl = this.scope.args.instagram.href + '/embed';
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
