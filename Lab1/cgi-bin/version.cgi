#!/usr/bin/perl
use strict;
use warnings;
use CGI;

my $q = CGI->new;
my %headers = map { $_ => $q->http($_) } $q->http();
for my $header ( keys %headers ) {
   if($header eq "HTTP_ACCEPT"){
   		if($headers{$header} eq 'application/vnd.byu.cs462.v1+json'){
   			print $q->header('application/json');
			print '{"version":"v1"}';
   		}
   		elsif ($headers{$header} eq 'application/vnd.byu.cs462.v2+json')
		{
			print $q->header('application/json');
			print '{"version":"v2"}';
		}
		else {
			print $q->header('application/json');
			print '{"version":"Incorrect Accept Header Type"}';
		}
   }
}
