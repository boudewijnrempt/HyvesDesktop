<?php slot::start('head') ?>
    <title>Hyves Desktop Crash Reports</title>
    <?php echo html::stylesheet(array(
        'css/datePicker.css',
        'css/flora/flora.all.css',
        'css/flora/flora.tablesorter.css'
    ), 'screen')?>

    <?php echo html::script(array(
        'js/jquery/plugins/ui/jquery.ui.all.js',       /* ui.accordion.js */
        'js/jquery/date.js',
        'js/jquery/plugins/ui/jquery.datePicker.js',     /* old school not ui.datepicker.js */
        'js/jquery/plugins/ui/jquery.tablesorter.min.js',       /* old school not ui.sortable.js */
        'js/jquery/plugins/sparklines/jquery.sparkline-1.3.min.js',
        'js/socorro/query.js',
        'js/socorro/dashboard.js'
    ))?>

    <script type="text/javascript">
    var socSearchFormModel = <?php echo json_encode($searchFormModel) ?>;
    </script>
<?php slot::end(); 

     View::factory('common/query_form', array(
        'searchFormModel'    => $searchFormModel,
        'versions_by_product' => $versions_by_product
     ))->render(TRUE);

     View::factory('common/dashboard_crash_widget', array(
        'widgetName' => "Top Crashes By Signature",
        'widgetData'   => $topcrashes,
        'subWidget'    => 'common/dashboard/topcrashbysig'
     ))->render(TRUE);

     View::factory('common/dashboard_crash_widget', array(
        'widgetName' => "Top Crashes By Url",
        'extraClasses' => 'first',
        'widgetData'   => $topcrashesbyurl,
        'subWidget'    => 'common/dashboard/topcrashbyurl'
     ))->render(TRUE);

     View::factory('common/dashboard_crash_widget', array(
        'widgetName' => "Mean Time Before FAIL",
        'widgetData'   => $mtbf,
        'subWidget'    => 'common/dashboard/mtbf'
     ))->render(TRUE);

?>
