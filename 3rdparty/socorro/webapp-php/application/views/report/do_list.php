<?php slot::start('head') ?>
    <title>Crash Reports in <?php out::H($params['signature']) ?></title>

    <?php echo html::stylesheet(array(
        'css/flora/flora.all.css'
    ), 'screen')?>
    <!--[if IE]><?php echo html::script('js/flot-0.5/excanvas.pack.js') ?><![endif]-->

    <?php echo html::script(array(
        'js/jquery/plugins/ui/jquery.ui.all.js',
        'js/jquery/plugins/ui/jquery.tablesorter.min.js',
        'js/flot-0.5/jquery.flot.pack.js'
    ))?>

  <script type="text/javascript">

      $(document).ready(function() { 
        $('#buildid-table').tablesorter(); 
        $('#reportsList').tablesorter({sortList:[[9,1]]});
        $('#report-list > ul').tabs({selected: 2});
      }); 
  </script>

  <style type="text/css">
   #buildid-outer {
     display: none;
   }
   .clear {
    clear: both;
   }
  </style>    

<?php slot::end() ?>

<h1 class="first">Crash Reports in <?php out::H($params['signature']) ?></h1>

<?php 
    View::factory('common/prose_params', array(
        'params'    => $params,
        'platforms' => $all_platforms
    ))->render(TRUE) 
?>

<div id="report-list">
    <ul>
        <li><a href="#graph"><span>Graph</span></a></li>
        <li><a href="#table"><span>Table</span></a></li>
        <li><a href="#reports"><span>Reports</span></a></li>
    </ul>
    <div id="graph">
      <div class="crashes-by-platform">
        <h3 id="by_platform_graph"><?php echo $crashGraphLabel ?></h3>
        <div id="graph-legend" class="crash-plot-label"></div>
        <div id="buildid-graph"></div>
      </div>
      <div class="clear"></div>
    </div>
    <div id="table">
        <table id="buildid-table" class="tablesorter">
            <thead>
                <tr>
                    <th>Build ID</th>
                    <?php if (count($all_platforms) != 1): ?><th>Crashes</th><?php endif ?>
                    <?php foreach ($all_platforms as $platform): ?>
                        <th><?php out::H(substr($platform->name, 0, 3)) ?></th>
                    <?php endforeach ?>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($builds as $build): ?>
                <tr>
	   <td class="human-buildid"><?php out::H(date('YmdH', strtotime($build->build_date))) ?></td>
                    <?php if (count($all_platforms) != 1): ?>
                    <td class="crash-count">
		    <?php out::H($build->count) ?> - <?php printf("%.3f%%", ($build->frequency * 100) ) ?>
                    </td>
                    <?php endif ?>
                    <?php foreach ($all_platforms as $platform): ?>
                        <td>
                            <?php out::H($build->{"count_$platform->id"}) ?> - 
                            <?php printf("%.3f%%", ($build->{"frequency_$platform->id"} * 100)) ?>
                        </td>
                    <?php endforeach ?>
                </tr>
                <?php endforeach ?>
            </tbody>
        </table>
    </div>
    <div id="reports">
        <?php View::factory('common/list_reports', array(
            'reports' => $reports 
        ))->render(TRUE) ?>
    </div>
</div>

<!-- end content -->
<script id="source" type="text/javascript">
//<![CDATA[
      $(document).ready(function() { 
          var shouldDrawPlot = true;
	  <?php if( count($builds) > 1){ ?>
	    $("#buildid-graph").width(<?php echo max( min(50 * count($builds), 800), 200) ?>);
	  <? } ?>

      $('#report-list > ul').bind('tabsshow', function(event, ui, data){
	  if (shouldDrawPlot && $(data.panel).attr('id') == "graph") {
            drawPlot();
            shouldDrawPlot = false;
        }
    });

    var drawPlot = function(){
      $.plot($("#buildid-graph"), 
             [<?php for($i = 0; $i < count($all_platforms); $i += 1){ 
		      $platform = $all_platforms[$i]; ?>
			{ label: <?php echo json_encode($platformLabels[$i]['label']) ?>,
		          data: <?php  echo json_encode($platformLabels[$i]['data']) ?>,
			  color: <?php echo json_encode($platformLabels[$i]['color']); 
			  if($i != (count($all_platforms) -1 )){ echo '},';}else{ echo '}';} ?>
	       <?php } ?> ],
             { // options

             <?php if( count($builds) > 1){ ?>
	       // Crashes by development builds Frequency over build day
               lines: { show: true }, points: { show: true},
	       xaxis:{
                 labelWidth: 55,
 	         ticks: <?php echo json_encode( $buildTicks ) ?>
	       },
	       legend: { show: true, container: $("#graph-legend"), noColumns: 4 }

	     <?php }else{ ?>
	       //Crashes for production build OS bar chart
               bars: { show: true },
               xaxis:{
                 labelWidth: 55,
   	         tickFormatter: function(n, o){ return ""; }
	       },
	       legend: { show: true, container: $("#graph-legend"), noColumns: 4 }
	     <?php } ?>		 
             }
     );
    }//drawPlot
});
//]]>
</script>