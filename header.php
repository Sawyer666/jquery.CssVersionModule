<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-type" content="text/html; charset=<?php bloginfo('charset'); ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <!--
 <link id="main_css" rel="stylesheet" type="text/css" media="all" href='' />   <title>
-->
    <?php bloginfo('name')?>
        </title>
        <?php wp_head(); ?>
</head>

<script>
    $(function () {
        $(document).cssplugin({
            link_main_css: '#main_css-css',
            parent: ".navbar",
            linkCss: "main_css-css"
        });
    });
</script>

<body>
    <div class="wrap">
        <div class="karkas">
            <header class="header">
                <div class="banner">
                    <div class="logo">
                        <a href="#"><img class="img-responsive"  src="<?php bloginfo('template_url') ?>/img/head.png" alt=""> 
            </div>    
          
            <div class="navbar-wrapper">
<!--                    <a id="switcher" href="#">123</a>-->
                        <nav class="navbar navbar-default" role="navigation">
                            <div class="navbar-header">
                                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                                    <span class="sr-only">Toggle navigation</span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                </button>
                                <a class="navbar-brand visible-xs" href="#">SITE TITLE</a>
                            </div>
                            <div class="collapse navbar-collapse navbar-ex1-collapse">
                                <?php              
                    wp_nav_menu( array(
                 'theme_location'=>'main-menu',
                 'depth' => 0,
                 'container' => 'container',
                 'menu'=>'Bootstrap Menu',   
                 'fallback_cb' => 'wp_page_menu',
                 'menu_class'=>'nav navbar-nav',
                 'walker' => new wp_bootstrap_navwalker())
                        );
                ?>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>

            <div class="container main">