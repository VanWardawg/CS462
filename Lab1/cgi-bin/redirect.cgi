#!/usr/bin/perl
use strict;
use CGI;
use URI;

my $query = new CGI;
my $value = $query->param('foo');
if($value == 'google')
{
	print $query->redirect('http://google.com');
}
elsif ($value == 'bing'){
	print $query->redirect('http://bing.com');
}


print "Content-type: text/html\n\n";
print "Hello, World.";