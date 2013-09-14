<script type="text/javascript">
    var prodVersMap = <?php echo json_encode($versions_by_product); ?>
</script>

<form id="searchform" method="get" action="<?php echo url::base() . "query/query" ?>">
<h2>Hyves Desktop Crash Reports</h2>
<fieldset>
    <input type="hidden" name="do_query" value="1" />
<ul>
<li><label for="product">Product</label>
        <select id="product" name="product" size="4" multiple="multiple">
            <?php foreach ($all_products as $row): ?>
                <option value="<?php out::H($row->product) ?>" <?php echo in_array($row->product, $params['product']) ? 'selected="selected"' : '' ?>>
                    <?php out::H($row->product) ?>
                </option>
            <?php endforeach ?>
        </select>
</li>
<li><label for="version">Version: </label>
        <select id="version" name="version" size="4" multiple="multiple">
            <?php foreach ($all_versions as $row): ?>
                <?php $row_version  = $row->product . ':' . $row->version; ?>
                <option value="<?php out::H($row_version) ?>" <?php echo in_array($row_version, $params['version']) ? 'selected="selected"' : '' ?>>
                    <?php out::H($row->product . ' ' . $row->version) ?>
                </option>
            <?php endforeach ?>
        </select>
</li>
<li><label for="platform">Operating System</label>
        <select id="platform" name="platform" size="<?php echo count($all_platforms) ?>" multiple="multiple">
            <?php foreach ($all_platforms as $row): ?>
                <option value="<?php out::H($row->id) ?>" <?php echo in_array($row->id, $params['platform']) ? 'selected="selected"' : '' ?>>
                    <?php out::H($row->name) ?>
                </option>
            <?php endforeach ?>
        </select>

</li>
<li><a href="#" id="advfiltertoggle" class="not-toggled">Advanced Filters</a>
    <ul id="advfilter">
        <li><label for="branch">Branch: </label>
        <select id="branch" name="branch" size="3" multiple="multiple">
            <?php foreach ($all_branches as $row): ?>
                <option value="<?php out::H($row->branch) ?>" <?php echo in_array($row->branch, $params['branch']) ? 'selected="selected"' : '' ?>>
                    <?php out::H($row->branch) ?>
                </option>
            <?php endforeach ?>
        </select>
        </li>
        <li>
          <ul id="occurs">
	    <li><label for="date">Occurs before</label>
        <?php echo form::input(
			       array('size' => '20', 'name'=>'date', 'id'=>'date', 'class'=>'date-pick'), 
            $params['date']
        )?>
        </li>
        <li><label for="range_value">Within the last</label>
	  <div id="within-fields">
        <?php echo form::input(
            array('size' => '2', 'name'=>'range_value', 'id'=>'range_value'), 
            $params['range_value']
        )?><?php echo form::dropdown(
            'range_unit',
            array(
                'hours'=>'Hours', 'days'=>'Days', 'weeks'=>'Weeks'
            ),
            $params['range_unit']
        )?>
	  </div>
	  </li>
	  </ul></li>
	<li>
	  <ul id="stack">
	    <li><label for="query_type">Stack Signature</label>
	  
          <input type="hidden" name="query_search" value="signature" />
          <!-- input type="hidden" name="query_search" value="signature" stack  -->
        <?php echo form::dropdown(
            'query_type',
            array(
                'exact'      => 'is exactly',
                'contains'   => 'contains',
                'startswith' => 'starts with'
            ),
            $params['query_type']
        ) ?>	      
        <?php echo form::input(
            array('size' => '40', 'name'=>'query', 'id'=>'query'), 
            $params['query']
        )?>
	    </li>
	  </ul> <!-- /stack -->
	</li></ul>
      </li>
      <li id="gofilter"><a href="#" class="button">Filter Crash Reports</a></li>
    </ul>
    </fieldset>
  </form>