jQuery.noConflict();

var ProjectName;

(function($) {
    ProjectName = {
        /**
         * foundation : http://foundation.zurb.com/docs/
         * -----------------------------------------
         */
        foundation: {
            init: function() {
                'use strict';

                //Init foundation
                $(document).foundation();
            }
        }
    };

    $(document).ready(function() {
        'use strict';
        ProjectName.foundation.init();
    });

    $(window).on('load', function() {
        'use strict';
    });
})(jQuery);