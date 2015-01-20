#!/usr/bin/perl
use strict;
use CGI;
use URI;

my $query = new CGI;

if($query->param('web') == 'google')
{
	print $query->redirect('http://google.com');
}
elsif ($query->param('web') == 'bing'){
	print $query->redirect('http://bing.com');
}


print "Content-type: text/html\n\n";
print "Hello, World.";