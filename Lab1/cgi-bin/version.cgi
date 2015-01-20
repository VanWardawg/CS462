#!/usr/bin/perl
use strict;
use warnings;
use CGI;

my $q = CGI->new;
$ENV{'HTTP_ACCEPT'} =~ tr/a-z/A-Z/;
print $ENV{'HTTP_ACCEPT'}
if ($ENV{'HTTP_ACCEPT'} eq 'application/vnd.byu.cs462.v1+json')
{
	print $q->header('application/json');
	print '{"version":"v1"}';
}
elsif ($ENV{'HTTP_ACCEPT'} eq 'application/vnd.byu.cs462.v2+json')
{
	print $q->header('application/json');
	print '{"version":"v2"}';
}
else {
	print $q->header('application/json');
	print 'Incorrect Accept Header Type';
}

