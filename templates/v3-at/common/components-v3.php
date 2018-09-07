<?php
$jsonString = file_get_contents("components/components.json");
$componentJson=json_decode($jsonString,true);

require('components/components-v3.head.php');

echo '<ul class="nav nav-tabs" id="tabs" role="tablist">';

$componentId = 0;
$components = array();

$properties = array('warning', 'info', 'noSpace', 'modification');

function outputComponent($component)
{
    echo '<div class="component" id='.$component['id'].'-target';

    if(isset($component['modification']))
    {
		
        echo ' dit-has-modification="true"';

        foreach($component['modification'] as $inputKey => $inputValue)
            echo " dit-modification-$inputKey=\"$inputValue\"";
		
    }

    if(isset($component['noSpace']))
    {
        echo ' dit-component-no-space="'.($component['noSpace'] ? 'true' : 'false').'"';
    }

    echo '>'; //finish component div open tag

    echo("<p></p>".$component['value']."<p></p>");
	
    echo '</div>';
    echo '<hr>';
	
	echo '<div class="text-center"><button class="copy-button btn-clipboard btn" id="'.$component['id'].'-trigger">Copy to Clipboard</button></div>';
    // echo '<div class="text-center"><button class="copy-button btn-clipboard" onclick="dCopy(\''.$component['id'].'-target\');">Copy to Clipboard</button></div>';
	
	echo '  <script>
			  document.getElementById("'.$component['id'].'-trigger").addEventListener("click", function() {
				clipboard.copy(document.getElementById("'.$component['id'].'-target").childNodes);
			  });
			  </script>';
			
}

foreach($componentJson as $categoryName => &$category)
{

    if(isset($category['types']))
    {
        echo '<li class="dropdown">';
        echo '<a href="#" class="dropdown-toggle" data-toggle="dropdown">' . $categoryName . ' <span class="caret"></span></a>';
        echo '<ul class="dropdown-menu" role="menu">';

        foreach ($category['types'] as $componentName => &$component) {
            if (is_string($component)) {
                $component = array("value" => $component);
            }

            foreach($properties as $property)
            {
                if(isset($category[$property]) && !isset($component[$property]))
                {
                    $component[$property] = $category[$property];
                }
            }

            $component['name'] = $componentName;
            $component['category'] = $categoryName;

            $currentComponentId = "component-v3-$componentId";
            $component['id'] = $currentComponentId;
            $components[] = $component;
            $componentId++;

            echo '<li><a href="#' . $currentComponentId . '" role="tab" data-toggle="tab">' . $componentName . '</a></li>';
        }

        echo '</ul>';
        echo '</li>';
    }
    else
    {
        $component = &$category;

        if (is_string($component)) {
            $component = array("value" => $component);
        }

        $component['category'] = $categoryName;

        $currentComponentId = "component-v3-$componentId";
        $component['id'] = $currentComponentId;
        $components[] = $component;
        $componentId++;

        echo '<li><a href="#' . $currentComponentId . '" role="tab" data-toggle="tab">'.$categoryName.'</a></li>';
    }
}

echo '</ul>';
echo '<div class="tab-content">';

foreach($components as $key => &$component)
{
    echo '<div class="tab-pane" id="'.$component['id'].'">';
    echo '<h2 class="page-header">'.$component['category'].'<small>    '.$component['name'].'</small></h2>';

    if(isset($component['warning']))
    {
        echo '<div class="bg-warning" style="padding: 15px">'.$component['warning'].'</div>';
    }

    if(isset($component['info']))
    {
        echo '<div class="bg-info" style="padding: 15px">'.$component['info'].'</div>';
    }

    if(isset($component['value']))
    {
        echo '<div class="row">';
        echo '<div class="col-md-2">';
        echo '</div>';
        echo '<div class="col-md-10 tab-content template-container">';

        outputComponent($component);

        echo '</div>';
        echo '</div>';
    }
    else if(isset($component['options']))
    {
        echo '<div class="row">';
        echo '<div class="col-md-2 template-options">';
        echo '<ul class="nav nav-pills nav-stacked option-pills">';

        $options = array();
        $optionId = 0;
        foreach($component['options'] as $optionName => &$option)
        {
            if(is_string($option))
            {
                $option = array('value' => $option);
            }

            foreach($properties as $property)
            {
                if(isset($component[$property]) && !isset($option[$property]))
                {
                    $option[$property] = $component[$property];
                }
            }

            $currentOptionId = $component['id']."-option-$optionId";
            $option['id'] = $currentOptionId;
            $options[$optionName] = $option;

            $optionId++;

            echo '<li><a href="#'.$currentOptionId.'" role="tab" data-toggle="tab">'.$optionName.'</a></li>';
        }
        echo '</ul>';
        echo '</div>';
        echo '<div class="col-md-10 tab-content template-container">';

        foreach($options as $optionName => &$option)
        {
            echo '<div class="tab-pane" id="' . $option['id'] . '">';

            outputComponent($option);

            echo '</div>';
        }

        echo '</div>';
        echo '</div>';
    }

    echo '</div>';
}

echo '</div>';

echo file_get_contents('components/components-v3.foot.html');
?>