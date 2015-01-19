#!/usr/bin/perl
use strict;
use CGI ;

my $query = new CGI;

if($query->param('foo'))
{
    $query->redirect('www.google.com');
}

print "Content-type: text/html\n\n";
print "Hello, World.";