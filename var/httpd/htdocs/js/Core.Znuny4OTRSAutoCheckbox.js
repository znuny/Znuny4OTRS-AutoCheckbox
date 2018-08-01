// --
// Copyright (C) 2012-2018 Znuny GmbH, http://znuny.com/
// --
// This software comes with ABSOLUTELY NO WARRANTY. For details, see
// the enclosed file COPYING for license information (AGPL). If you
// did not receive this file, see http://www.gnu.org/licenses/agpl.txt.
// --

"use strict";

var Core   = Core || {};

/**
 * @namespace
 * @exports TargetNS as Core.Znuny4OTRSAutoCheckbox
 * @description
 *      This namespace contains the special functions for Znuny4OTRSAutoCheckbox.
 */
Core.Znuny4OTRSAutoCheckbox = (function (TargetNS) {

    TargetNS.Init = function () {

        // find all select elements for date fields
        // also input fields because datefields can also be input fields (sysconfig TimeInputFormat)
        $('select,input').off('change.Z40AutoCheckbox').on('change.Z40AutoCheckbox', function() {
            TargetNS.AutoCheck(this);
        });

        // take care about ajax requests so we also need to have this functionality in process management
        Core.App.Subscribe('Event.AJAX.FunctionCall.Callback', function() {
            $('select,input').off('change.Z40AutoCheckbox').on('change.Z40AutoCheckbox', function() {
                TargetNS.AutoCheck(this);
            });
        });

        return true;
    };

    TargetNS.AutoCheck = function(Element) {

        // get id
        var ElementID = $(Element).attr('id');
        if (!ElementID) return;

        // only handle dynamic fields
        if (!ElementID.match(/^DynamicField/)) return;

        // check which element was changed of the date field
        var ElementType = ElementID.match(/(Day|Month|Year|Hour|Minute)$/);
        if (!ElementType) return;

        // mark checkbox for used date field
        var ElementCheckboxID = ElementID.replace(ElementType[1], 'Used');
        $('#' + ElementCheckboxID).prop('checked', true);
    };

    Core.Init.RegisterNamespace(TargetNS, 'APP_MODULE');

    return TargetNS;
}(Core.Znuny4OTRSAutoCheckbox || {}));
