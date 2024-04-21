<div class="sections row">
  <?php 
    $services = explode(";", wp_kses_post(get_theme_mod('serviceArray')));
    if ($services[0] != "" ) {
      foreach($services as $service) {
        $service_vals = explode(",", $service);
        $title = $service_vals[0];
        $img = $service_vals[1];
        $link = get_permalink($service_vals[2]);
        $descript = $service_vals[3];
        ?>
        <div class="col-lg-3 col-md-3 col-sm-9">
          <img src="<?php echo $img ?>">
          <a href="<?php echo $link ?>">
            <?php echo $title ?>
          </a>
          <p> <?php echo $descript ?> </p> 
        </div>
        <?php
      }
    }
  ?>
</div>
