(function($) {

  $.fn.mycarousel = function(method) {

    var defaultSettings = {
      list: 'mycarousel__list',
      item: 'mycarousel__item'
    };

    var settings = {};

    function _parseStep(steps){
      var isValid = false;
      var scroll = 0;
      var step = typeof steps == 'object' ? null : steps.split('=');
      
      if (step && step.length == 2) {
        isValid = true;
        scroll = parseInt(step[1]) || 0;
        if (step[0] == '-') {
          scroll *= -1;
        }
      }

      return {
        isValid: isValid,
        scroll: scroll
      }
    }

    var methods = {
      init: function() {
        var _itemWidth = 0;
        var _itemsCount;
        var _currentLeftValue = 0;
        var _displayedItemsCount = 0;        

        settings = $.extend(settings, defaultSettings, method);
        
        _itemsCount = this.children( '.' + settings.list ).children( '.' + settings.item ).length;
        var item = this.children( '.' + settings.list ).children( '.' + settings.item );
        _itemWidth = (parseInt(item.css('width')) || 0) + (parseInt(item.css('margin-left')) || 0) + (parseInt(item.css('margin-right')) || 0);
        _displayedItemsCount = Math.round(parseInt(this.css('width'))/_itemWidth);
        
        this.data('state', {
          settings: settings,
          itemWidth: _itemWidth,
          itemsCount: _itemsCount,
          currentLeftValue: _currentLeftValue,
          displayedItemsCount: _displayedItemsCount
        })
        return this;
      },

      scroll: function(steps) {
        var step = _parseStep(steps);
        if(step.isValid) {
          var state = this.data('state');
          var position = state.currentLeftValue + step.scroll*state.itemWidth;
          position = position > 0 ? 0 : position;
          position = position < -(state.itemsCount-state.displayedItemsCount)*state.itemWidth ? -(state.itemsCount-state.displayedItemsCount)*state.itemWidth : position;
          state.currentLeftValue = position;
          this.children( '.' + state.settings.list ).animate({ left : position + 'px'}, 500).data('state', state);
        }
        return this;
      }
    };

    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || !method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Метод с именем ' +  method + ' не существует для jQuery.mycarousel' );
    }
  }

})(jQuery);