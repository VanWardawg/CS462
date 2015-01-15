#!/usr/bin/perl
use strict;
use CGI ;

$query = new CGI;

if($query->param('op') eq "ds")
{
    $query->redirect('www.google.com');
}