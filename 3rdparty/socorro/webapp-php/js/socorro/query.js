$(document).ready(function(){
      var dateFormat = 'mm/dd/yyyy';
      $('#advfilter').hide();
	
      $('#advfiltertoggle').click(function() {
        $('#advfilter').toggle("fast");
      });
        
      /*$('#subnavtoggle').click(function() {
        $('#subnav').toggle();
      });*/

      $(function() {
          Date.format='yyyy-mm-dd';
          $('.date-pick').datePicker();
          $('.date-pick').dpSetStartDate('2007-01-01');
          $('#signatureList').tablesorter(); 
      });

    $('#searchform').bind('submit', function(){
	if($('input[name=date]').val() == dateFormat){
	  $('input[name=date]').val('');
	}
        $('#branch').get(0).options[0].selected = false;
      });
    if($.trim($('input[name=date]').val()) == ""){
      $('input[name=date]').val(dateFormat);
    }
  $('select[name=product]').bind('change', function(){
      var selected =  $('select[name=product]').val();
      if(selected.length > 0){
        updateVersion(selected);
      }
  });
  function updateVersion(products, selected){
    var sel = selected || [];
    var s = "";
    for(var j=0; j < products.length; j++){
      var product = products[j];
      for(var i=0; i < prodVersMap[product].length; i++){
        var v = [prodVersMap[product][i]['product'],
                 prodVersMap[product][i]['version']];
        var att = "";

        if($.inArray(v.join(':'), sel) >= 0){
	  att = " selected='true'";
	}
        s += "<option value='" + v.join(':') + "'" + att + ">" + v.join(' ') + "</option>";
      }
    }
    $('select[name=version]').html(s);
    //If nothing was already selected, pick the first item
    if( $('select[name=version]').val() == null ){
      $('select[name=version] option:first').attr('selected', true);
    }
  }

  updateVersion(socSearchFormModel.product, socSearchFormModel.version);

   $('#gofilter').bind('click', function(){
      $('#searchform').submit();
    });
    window.updateVersion = updateVersion;  
});


