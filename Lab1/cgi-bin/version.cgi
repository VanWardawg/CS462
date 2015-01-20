use strict;
use warnings;
use CGI;

my $q = CGI->new;

 print $q->header('application/json');
 print '{"version":1}';