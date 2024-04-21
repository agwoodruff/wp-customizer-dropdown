<?php
require get_template_directory() . '/custom-service.php';

function cv_customize_register( $wp_customize ) {
  // Services Controls Section 
  $wp_customize->add_section( 'services_controls_section',
    array(
      'title' => 'Services Section',
      'panel' => 'front_page_panel',
    )
  );

  $wp_customize->add_setting( 'serviceArray',
    array(
      'default' => 'Service One',
      'transport' => 'refresh',
      'sanitize_callback' => 'wp_kses_post'
    )
  );

  $wp_customize->add_control( new CV_Services_Dropdown_Control($wp_customize, 'serviceArray',
    array(
      'label' => 'Services',
      'description' => esc_html( 'Choose number of services shown on screen' ),
      'section' => 'services_controls_section',
    )
  ));
};

add_action( 'customize_register', 'cv_customize_register' );
