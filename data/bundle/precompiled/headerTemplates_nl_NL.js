var aShowStatus=new Object();
aShowStatus['online'] = {show: 'normal', status: 'Online'};
aShowStatus['busy'] = {show: 'dnd', status: 'Bezig'};
aShowStatus['berightback'] = {show: 'away', status: 'Ben zo terug'};
aShowStatus['away'] = {show: 'away', status: 'Away'};
aShowStatus['phone'] = {show: 'dnd', status: 'Aan de telefoon'};
aShowStatus['lunch'] = {show: 'away', status: 'Lunchen'};
aShowStatus['offline'] = {show: 'offline', status: 'Toon Offline'};

//_dynjsload is the list of all sources that can be loaded dynamically at runtime
//used by dynamic inclusion mechanism in header.js    
//add any dynamically loaded js file here before using the 'requires' function in header.js
var _dynjsload = new Object();
_dynjsload['/statics/chat/swfobject.js'] = '/statics/chat/swfobject.js?version=d4f0eb509547';
_dynjsload['/statics/hyvesense/hyvesense2.js'] = '/statics/hyvesense/hyvesense2.js?version=170141dfbc15';
_dynjsload['/statics/sound.js'] = '/statics/sound.js?version=1da2624116b5';
_dynjsload['/statics/XMLStream.swf'] = '/statics/XMLStream.swf?version=119cd63c9bcc';
_dynjsload['/statics/PersistentConnection.swf'] = '/statics/PersistentConnection.swf?version=9abe39a93d0f';
_dynjsload['/statics/kwekker2/buzzer.js'] = '/statics/kwekker2/buzzer.js?version=5ec8dcca9a8d';
_dynjsload['/statics/yui-ext/adapter/yui/yui-utilities.js'] = '/statics/yui-ext/adapter/yui/yui-utilities.js?version=7237658376e3';
_dynjsload['/statics/yui-ext/adapter/yui/ext-yui-adapter.js'] = '/statics/yui-ext/adapter/yui/ext-yui-adapter.js?version=22963d19ae19';
_dynjsload['/statics/yui-ext/ext-all.js'] = '/statics/yui-ext/ext-all.js?version=752a4a5d5608';
_dynjsload['/statics/yui-ext/resources/css/ext-all.css'] = '/statics/yui-ext/resources/css/ext-all.css?version=a6ea79ad6024';
_dynjsload['/statics/yui-ext/resources/css/ytheme-aero.css'] = '/statics/yui-ext/resources/css/ytheme-aero.css?version=8d5820699454';
_dynjsload['/statics/dyninccb.js'] = '/statics/dyninccb.js?version=fb58e8c05aad';
_dynjsload['/statics/chat/siteclient.js'] = '/statics/chat/siteclient.js?version=1a90d77bbbcf';
_dynjsload['/statics/chat/client.css'] = '/statics/chat/client.css?version=520c1830f7b7';
_dynjsload['/statics/pager.js'] = '/statics/pager.js?version=e559dd966708';
_dynjsload['/statics/pager.redesign.js'] = '/statics/pager.redesign.js?version=1b8a79e0c359';
_dynjsload['/statics/mvc.js'] = '/statics/mvc.js?version=8ddf20ed124a';
_dynjsload['/statics/mediaLocator.js'] = '/statics/mediaLocator.js?version=4c69ad9df1ee';
_dynjsload['/statics/simpledateformat.js'] = '/statics/simpledateformat.js?version=19d6aa1facaf';
_dynjsload['/statics/dateformat.js'] = '/statics/dateformat.js?version=3e43c58207c2';
_dynjsload['/precompiled/amazon.js'] = '/precompiled/amazon.js?version=75e365f8e9f6';
_dynjsload['/statics/controls/preview.js'] = '/statics/controls/preview.js?version=4330282687a1';
_dynjsload['/statics/controls/RTE_Memberpicker.js'] = '/statics/controls/RTE_Memberpicker.js?version=d8eed75ba669';
_dynjsload['/statics/controls/RTE_Mediapicker.js'] = '/statics/controls/RTE_Mediapicker.js?version=49ef7fe61ccb';
_dynjsload['/statics/controls/RTE_Widgetpicker.js'] = '/statics/controls/RTE_Widgetpicker.js?version=4803b8a2c031';
_dynjsload['/statics/controls/RTE_Youtubepicker.js'] = '/statics/controls/RTE_Youtubepicker.js?version=6c2346d74968';
_dynjsload['/statics/controls/RTE_Smileypicker.js'] = '/statics/controls/RTE_Smileypicker.js?version=5c463bd20548';
_dynjsload['/statics/controls/RichTextEditor.js'] = '/statics/controls/RichTextEditor.js?version=95aa7f8383e1';
_dynjsload['/statics/reaction/reactions.js'] = '/statics/reaction/reactions.js?version=2edb5411b73e';
_dynjsload['/statics/mediaFromAlbumPicker.js'] = '/statics/mediaFromAlbumPicker.js?version=646cf275f918';
_dynjsload['/statics/TabPage.js'] = '/statics/TabPage.js?version=e1378fdf30f5';
_dynjsload['/statics/general/error_success.js'] = '/statics/general/error_success.js?version=07891aa93b28';
_dynjsload['/statics/relationeditor.js'] = '/statics/relationeditor.js?version=c1ecab866548';
_dynjsload['/statics/friendgroup.js'] = '/statics/friendgroup.js?version=a6c6bc96b68c';
_dynjsload['/statics/scriptaculous/dragdrop.js'] = '/statics/scriptaculous/dragdrop.js?version=f85d84cb5844';
_dynjsload['/statics/scriptaculous/controls.js'] = '/statics/scriptaculous/controls.js?version=857c50790732';
_dynjsload['/statics/WidgetUtil.js'] = '/statics/WidgetUtil.js?version=dc62eccf2f17';
_dynjsload['/statics/mouseOverPreview.js'] = '/statics/mouseOverPreview.js?version=28d7d1ac07fd';
_dynjsload['/statics/controls/mediaorganizer.js'] = '/statics/controls/mediaorganizer.js?version=8a4f536cb653';
_dynjsload['/statics/controls/messagecenter.js'] = '/statics/controls/messagecenter.js?version=c5e0d35ea417';
_dynjsload['/statics/controls/areaselect.js'] = '/statics/controls/areaselect.js?version=4bb04d52536c';
_dynjsload['/statics/popupdialog.js'] = '/statics/popupdialog.js?version=0abb4096ff55';
_dynjsload['/statics/css/mediaorganizer.css'] = '/statics/css/mediaorganizer.css?version=d33427405cb9';
_dynjsload['/statics/css/messagecenter.css'] = '/statics/css/messagecenter.css?version=b12edb850b86';
_dynjsload['/statics/PokeMeDialog.js'] = '/statics/PokeMeDialog.js?version=07a890a92c17';
_dynjsload['/statics/CrushUtil.js'] = '/statics/CrushUtil.js?version=a8417fc956c2';
_dynjsload['/statics/HubModeratorEditDialog.js'] = '/statics/HubModeratorEditDialog.js?version=8f786fbaf222';
_dynjsload['/statics/NetworksuggestionUtil.js'] = '/statics/NetworksuggestionUtil.js?version=8f148cd561b2';
_dynjsload['/statics/reaction/reactions.js'] = '/statics/reaction/reactions.js?version=2edb5411b73e';
_dynjsload['/statics/hub/hub.js'] = '/statics/hub/hub.js?version=d583fb6c0713';
_dynjsload['/statics/chat/shared.js'] = '/statics/chat/shared.js?version=c7eefe44376c';
_dynjsload['/statics/ProfileManage.js'] = '/statics/ProfileManage.js?version=d08924b07bfd';
_dynjsload['/statics/ApiPartnerUtil.js'] = '/statics/ApiPartnerUtil.js?version=fcb30067d720';
_dynjsload['/statics/ajaxtip.js'] = '/statics/ajaxtip.js?version=97672e27d425';
_dynjsload['/statics/prototip/js/prototip.js'] = '/statics/prototip/js/prototip.js?version=d2ff6240e334';
_dynjsload['/statics/prototip/css/prototip.css'] = '/statics/prototip/css/prototip.css?version=4bf40ddb448c';
_dynjsload['/statics/SignalManager.js'] = '/statics/SignalManager.js?version=8f2174608c49';
_dynjsload['/statics/NewsfeedFriendBlock.js'] = '/statics/NewsfeedFriendBlock.js?version=7262e1d6ed4e';
_dynjsload['/statics/progressbar.js'] = '/statics/progressbar.js?version=0d53e73e2c08';
_dynjsload['/statics/mediaUploadPicker.js'] = '/statics/mediaUploadPicker.js?version=ed5ecb126747';
_dynjsload['/statics/MusicUtil.js'] = '/statics/MusicUtil.js?version=bf906b2d1cfc';
_dynjsload['/statics/number-functions.js'] = '/statics/number-functions.js?version=fbf0904f5ef0';
_dynjsload['/statics/mediaUploadPicker.js'] = '/statics/mediaUploadPicker.js?version=ed5ecb126747';
_dynjsload['/statics/mediaUploadPickerStatus.js'] = '/statics/mediaUploadPickerStatus.js?version=06d149ad6d9a';
_dynjsload['/statics/mediaUploadPickerPOU.js'] = '/statics/mediaUploadPickerPOU.js?version=d9c8efc20999';
_dynjsload['/statics/mediaUploadPickerAurigma.js'] = '/statics/mediaUploadPickerAurigma.js?version=8adc7fcd2f1d';
_dynjsload['/statics/Aurigma/ImageUploader.js'] = '/statics/Aurigma/ImageUploader.js?version=d26e1bf97110';
_dynjsload['/statics/mediaUploadModule.js'] = '/statics/mediaUploadModule.js?version=40d6c64f7601';
_dynjsload['/statics/notificationcontrol.js'] = '/statics/notificationcontrol.js?version=1695ebe43e5a';
_dynjsload['/statics/LocationHistoryUtil.js'] = '/statics/LocationHistoryUtil.js?version=272ee03f643c';
_dynjsload['/statics/GadgetUtil.js'] = '/statics/GadgetUtil.js?version=e4e6fbd248ad';
_dynjsload['/statics/gap/gaputil.js'] = '/statics/gap/gaputil.js?version=33fc118aa6b2';
_dynjsload['/statics/gap/hyvesgadgets.js'] = '/statics/gap/hyvesgadgets.js?version=76a2545f8e40';
_dynjsload['/statics/gap/compact.js'] = '/statics/gap/compact.js?version=45b633958112';
_dynjsload['/precompiled/os.js'] = '/precompiled/os.js?version=008b6a71bd3f';
_dynjsload['/statics/openSocialModule.js'] = '/statics/openSocialModule.js?version=ff49af57653a';
_dynjsload['/statics/Btf/BtfUtil.js'] = '/statics/Btf/BtfUtil.js?version=7b9b6e867e4a';

_dynjsload['/Music/musicTextTemplate.tpl'] = '/precompiled/musicTextTemplate_nl_NL.224d1427fae54636.js';
_dynjsload['/general/error_successTemplate.tpl'] = '/precompiled/error_successTemplate_nl_NL.e4be4f2769ddb694.js';
_dynjsload['/relationeditor/relationEditorTemplates.tpl'] = '/precompiled/relationEditorTemplates_nl_NL.00faed3fce09e593.js';
_dynjsload['/mediaorganizer/mediaOrganizerTemplates.tpl'] = '/precompiled/mediaOrganizerTemplates_nl_NL.fe2f80e9b2a88bf3.js';
_dynjsload['/message/messageTemplates.tpl'] = '/precompiled/messageTemplates_nl_NL.4e39d5db24c2aa5a.js';
_dynjsload['/PokeMe/pokeMeDialogTemplates.tpl'] = '/precompiled/pokeMeDialogTemplates_nl_NL.1749dd53034cc7c1.js';
_dynjsload['/rte/rteTemplates.tpl'] = '/precompiled/rteTemplates_nl_NL.6dd38c866567068e.js';
_dynjsload['/hub/js/hubModeratorEditDialogTemplates.tpl'] = '/precompiled/hubModeratorEditDialogTemplates_nl_NL.e093606c93b0c969.js';
_dynjsload['/reaction/reactionTemplates.tpl'] = '/precompiled/reactionTemplates_nl_NL.bd780079124174ea.js';
_dynjsload['/networktool/networktoolTemplates.tpl'] = '/precompiled/networktoolTemplates_nl_NL.ca9e58ac7553fd63.js';
_dynjsload['/Media/mediaitemTemplates.tpl'] = '/precompiled/mediaitemTemplates_nl_NL.85dc3989ba91bcac.js';
_dynjsload['/Chat/siteClientTemplates.tpl'] = '/precompiled/siteClientTemplates_nl_NL.8a4376357693a8d7.js';
_dynjsload['/hyvesense/2/hub_selector_templates.tpl'] = '/precompiled/hub_selector_templates_nl_NL.1bd2a2c437593cfc.js';
_dynjsload['/feed/signalManagerTemplates.tpl'] = '/precompiled/signalManagerTemplates_nl_NL.ec48a0e26f497621.js';
_dynjsload['/gap/gapTemplates.tpl'] = '/precompiled/gapTemplates_nl_NL.b963eec331ae8a36.js';
_dynjsload['/Media/uploadtemplates.tpl'] = '/precompiled/uploadtemplates_nl_NL.c9da66a9052556d2.js';
_dynjsload['/FriendGroup/friendGroupDialogTemplates.tpl'] = '/precompiled/friendGroupDialogTemplates_nl_NL.4dbe911d482db0ac.js';
_dynjsload['/Btf/btftemplates.tpl'] = '/precompiled/btftemplates_nl_NL.2c983a29bb7a31d3.js';
 
var _soundFiles = new Object(); 
_soundFiles['ChatSound'] = '/statics/ChatSound.swf?version=a3c7747d2bc8';

//this is the list of dynamically includable modules
//it is a mapping from the name of the module to the javascript source that implements it
var _modules = new Object();
_modules['BuzzManager'] = '/statics/kwekker2/buzzer.js';
_modules['DateFormat'] = '/statics/dateformat.js';
_modules['SiteClient'] = '/statics/chat/siteclient.js';
_modules['SoundManager'] = '/statics/sound.js';
_modules['ErrorManager'] = '/statics/general/error_success.js';
_modules['PokeMeDialog'] = '/statics/PokeMeDialog.js';
_modules['RelationEditor'] = '/statics/relationeditor.js';
_modules['MediaOrganizer'] = '/statics/controls/mediaorganizer.js';
_modules['MessageCenter'] = '/statics/controls/messagecenter.js';
_modules['WidgetUtil'] = '/statics/WidgetUtil.js';
_modules['CrushUtil'] = '/statics/CrushUtil.js';
_modules['RichTextModule'] = '/statics/controls/RichTextEditor.js';
_modules['MediaUploadModule'] = '/statics/mediaUploadModule.js';
_modules['HubModeratorEditDialog'] = '/statics/HubModeratorEditDialog.js';
_modules['PopupDialogManager'] = '/statics/popupdialog.js';
_modules['ReactionModule'] = '/statics/reaction/reactions.js';
_modules['NetworksuggestionUtil'] = '/statics/NetworksuggestionUtil.js';
_modules['HubPicker'] = '/statics/hub/hub.js';
_modules['HubForm'] = '/statics/hub/hub.js';
_modules['MediaLocator'] = '/statics/mediaLocator.js';
_modules['ProfileManage'] = '/statics/ProfileManage.js';
_modules['PreviewModule'] = '/statics/controls/preview.js';
_modules['ApiPartnerUtil'] = '/statics/ApiPartnerUtil.js';
_modules['HubSelector'] = '/statics/hub/hub.js';
_modules['SignalManager'] = '/statics/SignalManager.js';
_modules['TableView'] = '/statics/NewsfeedFriendBlock.js';
_modules['AddToFriendGroupDialog'] = '/statics/friendgroup.js';
_modules['FriendgroupPickerDialog'] = '/statics/friendgroup.js';
_modules['FriendgroupControlModule'] = '/statics/friendgroup.js';
_modules['OpenSocialModule'] = '/statics/openSocialModule.js';

// some default texts:
templates.addTranslation('GENERAL_OK', 'Ok');
templates.addTranslation('GENERAL_CANCEL', 'Annuleren');
templates.addTranslation('GENERAL_NAVIGATION_PAGE', 'Pagina');
templates.addTranslation('GENERAL_NAVIGATION_PAGE_NEXT', 'Volgende pagina');
templates.addTranslation('GENERAL_NAVIGATION_PAGE_PREV', 'Vorige pagina');
templates.addTranslation('GENERAL_SOMETHING_WENT_WRONG_RELOAD', 'Er is iets misgegaan, wil je de pagina opnieuw laden?');

templates.addFromString('header.tmplDropShadow', '<table class=\"ds\" style=\"width: 100%; height: 100%\">\n<tr>\n    <td class=\"ds_c\"><\/td>\n    <td class=\"ds_b\"><\/td>\n    <td class=\"ds_c ds_img\" style=\"background-image:url(http://${hyves_cache_url}/images/shadow/tr_shadow.png);\"><\/td>\n<\/tr>\n<tr>\n    <td class=\"ds_b\"><\/td>\n    <td class=\"ds_b\"><\/td>\n    <td class=\"ds_img\" width=\"8\" style=\"background-image:url(http://${hyves_cache_url}/images/shadow/r_shadow.png);\"><\/td>\n<\/tr>\n<tr>\n    <td class=\"ds_c ds_img\" style=\"background-image:url(http://${hyves_cache_url}/images/shadow/bl_shadow.png);\"><\/td>\n    <td class=\"ds_b ds_img\" style=\"background-image:url(http://${hyves_cache_url}/images/shadow/b_shadow.png);\"><\/td>\n    <td class=\"ds_c ds_img\" style=\"background-image:url(http://${hyves_cache_url}/images/shadow/br_shadow.png);\"><\/td>\n<\/tr>         \n<\/table>\n');
templates.addFromString('header.tmplDialog.default', ' \n<div class=\"DialogBox BodyTextSmall Test\">\n	<div id=\"${id}_header\" class=\"${headerClass}\">\n\n    		<div id=\"${id}_header_busy\" style=\"display: none;float: left;\"><img src=\"http://${hyves_cache_url}/images/ajax_action.gif\" border=\"0\" alt=\"Laden...\"/>&nbsp;&nbsp;<\/div>\n            <div id=\"${id}_header_msg\" style=\"float: left;\">&nbsp;<\/div>\n\n            <div style=\"cursor: pointer; float: right; height: 15px\">\n                <div id=\"${id}_header_restore\" class=\"popupbutton popupbutton-restore\" style=\"display: none;\"><\/div>\n                <div id=\"${id}_header_minimize\" class=\"popupbutton popupbutton-minimize\" style=\"display: none;\"><\/div>\n                <div id=\"${id}_header_maximize\" class=\"popupbutton popupbutton-maximize\" style=\"display: none;\"><\/div>\n                <div id=\"${id}_header_close\" class=\"popupbutton popupbutton-close\" style=\"display: none;\"><\/div>\n            <\/div>\n            \n	<\/div>\n	<div id=\"${id}_body\" class=\"${bodyClass}\"{if bodyStyle} style=\"${bodyStyle}{/if}\"><\/div>\n	<div id=\"${id}_footer\" class=\"${footerClass}\" style=\"display: none;\">\n		<div id=\"${id}_footer_buttons\" style=\"float: right;padding: 10px 5px 5px 5px;\"><\/div>\n	<\/div>\n<\/div>\n');
templates.addFromString('header.tmplDialog.notification', ' \n    <div class=\"DialogBox BodyTextSmall\" style=\"width: 200px;\">\n      <div class=\"${headerClass}\" style=\"height: 22px;\">\n          <div style=\"float: left;\">Hyves<\/div>\n          <div style=\"cursor: pointer; float: right; height: 15px\">\n              <div id=\"${id}_header_close\" class=\"popupbutton popupbutton-close\" style=\"display: none;\"><\/div>\n          <\/div>\n      <\/div>\n    <div id=\"${id}_body\" class=\"${bodyClass}\" style=\"height: 100px;\"><\/div>\n<\/div>\n');
templates.addFromString('header.tmplDialogButton.default', '<input type=\"button\" id=\"${id}\" class=\"DialogButton\" value=\"${value}\"><\/input>&nbsp;&nbsp;\n');
templates.addFromString('header.tmplDialogDock', '<div id=\"${id}\" class=\"${windowClass}\">${content}<\/div>\n');        
templates.addTranslation('ILLEGAL_GADGET', 'Deze gadget is nog niet toegestaan, of er is iets anders misgegaan. ');
templates.addTranslation('RTE_PREVIEW_GADGET', 'Gadget<br />\r\n<img src=\"http://cache1.hyves-static.net/images/ajax_action.gif\" />');
templates.addTranslation('RTE_MSIE6_GOODGADGET', 'Deze gadget is goedgekeurd en zal op de site getoond worden');
templates.addTranslation('PRINT_MEDIA_NO_RIGHT_TO_PRINT', 'Je mag deze foto helaas niet bestellen!');
templates.addTranslation('PRINT_ALBUM_NO_RIGHT_TO_PRINT', 'Helaas mag je geen foto\'s uit dit album bestellen');
templates.addTranslation('PRESENCESHOWSTATUSMENU_TITLE', 'Mijn online status');
templates.addTranslation('GENERAL_SUBMIT', 'Verstuur');

templates.addFromString('gadget.msg.error', '<div id=\"${id}\">\n<span style=\"display: block; width: 150px; height: 150px; border: 1px solid red; text-align: center; background-color: white; color: black;\">\n${msg}\n<\/span>\n<\/div>\n');
templates.addFromString('gadget.msg.ok', '<div id=\"${id}\">\n<span style=\"display: block; width: 150px; height: 150px; border: 1px solid blue; text-align: center; background-color: white; color: black;\">\n${msg}\n<\/span>\n<\/div>\n');                              
templates.addFromString('presence.tmplPresenceSelectorDropDownMenu', '<table bgcolor=\"#6699CC\" width=\"200\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n    {if currentPresenceVisiblity <= 1}\n    <tr>\n        <td class=\"BodyTextSmall MyMenu\" style=\"padding: 2px;\">\n            Je kunt je online status niet wijzigen want niemand mag het toch zien.\n        <\/td>\n    <\/tr>\n    {else}\n        {for aStatus in aShowStatus}\n            <tr>\n                <td class=\"BodyTextSmall\" style=\"padding: 2px;\">\n                    <a href=\"javascript:void(0);\" onclick=\"presenceManager.getPresenceSelector(\'${name}\').setStatus(\'${aStatus_index}\')\" \n                        style=\"color: #FFFFFF;\">\n                        <img src=\"http://${hyves_cache_url}/images/hyppo/status_${aStatus_index}.png \" \n                            class=\"transparentpng\" width=\"18\" height=\"15\" border=\"0\" \n                            alt=\"${aStatus.status}\" title=\"${aStatus.status}\" \n                            align=\"left\">${aStatus.status}\n                    <\/a>       \n                <\/td>\n            <\/tr>\n        {/for}\n    {/if}\n    <tr>\n        <td class=\"BodyTextSmall MyMenu\" style=\"padding: 2px;border-top: 1px solid #FFFFFF;color: #000;background-color: #CFDFEF;\">\n            Online status zichtbaar voor: ${currentPresenceVisiblityDescription}\n        <\/td>\n    <\/tr>\n    <tr>\n        <td class=\"BodyTextSmall MyMenu\" style=\"padding: 3px;color: #000;background-color: #CFDFEF;\">\n            Wie mag met me chatten: ${currentChatability}\n        <\/td>\n    <\/tr>\n    <tr>\n        <td class=\"BodyTextSmall MyMenu\" style=\"padding: 3px;background-color: #CFDFEF;\">\n            <a href=\"${chatSettingsUrl}\" color=\"#FFFFFF;\">Verander instellingen<\/a>\n        <\/td>\n    <\/tr>\n    \n<\/table>\n');     

templates.addFromString('presence.tmplPresenceSelector', '<a href=\"javascript:void(0);\" class=\"personal_link ChangePresence_${name}\">\n    <nobr>\n        <span id=\"sps_status_${name}\" class=\"Inline BodyTextSmall\">\n             ${status.status}\n        <\/span>\n        <img src=\"http://${hyves_cache_url}/images/icons/${personalisedItemsSubdir}/icons16/arrow_down.png\" width=\"12\" height=\"7\" class=\"transparentpng fakelink\" border=\"0\">\n    <\/nobr>\n<\/a>\n');
templates.addFromString('presence.tmplPresenceSelectorSelect', '<select id=\"${name}_select\">\n{for aStatus in aShowStatus}\n    {if aStatus_index == status}\n        <option value=\"${aStatus_index}\" selected=\"selected\">${aStatus.status}<\/option>\n    {else}\n        <option value=\"${aStatus_index}\">${aStatus.status}<\/option>\n    {/if}\n{/for}\n<\/select>\n'); 
templates.addFromString('presence.tmplShowPresence', '{if loggedInMember || status != \'offline\' }\n<img src=\"http://${hyves_cache_url}/images/hyppo/status_${status}.png\" class=\"transparentpng\" width=\"18\" height=\"15\" border=\"0\" alt=\"\" title=\"\">\n{/if}\n{if availability == 1 && !loggedInMember }\n (Site)\n{/if}\n');
