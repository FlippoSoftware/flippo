BEGIN TRANSACTION;

LET $countNewSet = SELECT count() FROM set WHERE author = $auth.id GROUP ALL; 
LET $name = IF $ln = 'ru' { 'Новый набор' } ELSE { 'New set' };

$name = IF $countNewSet > 0 { string::concat($name, ' (', $countNewSet, ')') }

CREATE set CONTENT {
  name: $name
}
;

REMOVE PARAM IF EXISTS $name;
REMOVE PARAM IF EXISTS $countNewSet;

COMMIT TRANSACTION;