#!/usr/bin/perl
use strict;
use CGI;
use URI;

my $query = new CGI;

if($query->param('foo'))
{
	print $query->redirect('http://google.com');
}

print "Content-type: text/html\n\n";
print "Hello, World.";