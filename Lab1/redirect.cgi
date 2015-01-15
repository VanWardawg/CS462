#!/usr/bin/perl
use strict;
use CGI ;

$query = new CGI;

if($query->param('foo'))
{
    $query->redirect('www.google.com');
}