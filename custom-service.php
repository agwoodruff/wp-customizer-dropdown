<?php

include_once ABSPATH . 'wp-includes/class-wp-customize-control.php';

class CV_Services_Dropdown_Control extends WP_Customize_Control {

    public function enqueue() {
        $pages = new WP_Query( array(
            'post_type'   => ['page', 'post'],
            'post_status' => 'publish',
            'orderby'     => 'date',
            'order'       => 'DESC'
        ));
        
        while( $pages->have_posts() ) {
                    $pages->the_post();
        }

        wp_enqueue_style('customizer_style', get_template_directory_uri() . '/custom-service-style.css');
        wp_enqueue_style('cv_fontawesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', array(), '6.4.0', 'all');
        wp_enqueue_script('customizer',  get_template_directory_uri() . '/service-customize.js', array(), '5.3.2', true);
        wp_localize_script( 'customizer', 'page_data', array($pages) );
    }

	protected function render_content() {
		// render control here
        ?>
        <div class="custom-control">
            <?php if(!empty($this->label)) { ?>
                <span class="customize-control-title"><?php echo esc_html($this->label); ?></span>
            <?php } ?>
            <?php if(!empty( $this->description)) { ?>
                <span class="customize-control-description"><?php echo wp_kses_post($this->description); ?></span>
            <?php } ?>

            <div class="service-customizer-div">

            <?php 
            ?>
                <div class="title-and-delete">
                    <h3>Service</h3>
                    <span class="custom-icon">
                        <i class="fa-solid fa-caret-up"></i>
                        <span class="custom-delete-button">&#10006</span>
                    </span>
                </div>
                <div class="custom-input-div">
                    <span class="customize-control-title">Service Title</span>
                    <span class="customize-control-description">Title for service</span>
                    <input type="text" id="service-title" name="service-title"><br>
                    
                    <span class="customize-control-title">Service Image</span>
                    <span class="customize-control-description">Upload or choose image</span>
                
                    <img class="custom-img" src="<?php echo esc_url( get_template_directory_uri() ); ?>/images/service-1.jpg">
                    <span>
                        <button type="button" class="button upload-button-custom">Change image</button>
                    </span>

            <?php
            $pages = new WP_Query( array(
                'post_type'   => ['page', 'post'],
                'post_status' => 'publish',
                'orderby'     => 'date',
                'order'       => 'DESC'
            ));
            ?>

                    <span class="customize-control-title">Service Page</span>
                    <span class="customize-control-description">Choose which page the service will link to</span>
                    <select id="service-page">
            <?php
             while( $pages->have_posts() ) {
                $pages->the_post();
                echo "<option " . selected( " ", get_the_ID() ) . " value='" . get_the_ID() . "'>" . the_title( '', '', false ) . "</option>";
            } 
            ?>
                    </select>

                    <span class="customize-control-title">Service Description</span>
                    <span class="customize-control-description">Description for service</span>
                    <textarea rows="5" style="width:100%;" id="service-descript"></textarea>
                </div>
            </div>

            <button type="button" class="button-secondary add-service">Add Service</button>

            <input type="hidden" class="total-service-values" id="<?php echo esc_attr($this->id); ?>" name="<?php echo esc_attr($this->id); ?>" <?php echo esc_attr($this->link()) ?> value="<?php echo esc_attr($this->value()); ?>">
        </div>
        <?php
	}
}