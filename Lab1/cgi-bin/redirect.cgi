#!/usr/bin/perl
use strict;
use CGI;
use URI;

my $query = new CGI;

if($query->param('foo'))
{
	my $welcome = URI->new_abs("www.google.com", $q->url);

	print $q->redirect( -uri => $welcome);
}

print "Content-type: text/html\n\n";
print "Hello, World.";