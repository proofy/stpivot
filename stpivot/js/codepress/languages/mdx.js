/*
 * CodePress regular expressions for MDX syntax highlighting
 * By Karel Reynaldo
 */
 
// MDX
Language.syntax = [
	//{ input : /\"(.*?)(\")/g, output : '<s>\"$1$2</s>' }, // strings double quote
	//{ input : /\'(.*?)(\')/g, output : '<s>\'$1$2</s>' }, // strings single quote
	{ input : /\b(ABSOLUTE|ACTIONPARAMETERSET|AFTER|AGGREGATE|ALL|AND|AS|ASC|AVERAGE|BASC|BDESC|BEFORE|BEFORE_AND_AFTER|BY|CACHE|CALCULATE|CALCULATION|CALCULATIONS|CELL|CELLFORMULASETLIST|CHAPTERS|CLEAR|COLUMN|COLUMNS|CREATE|CREATEPROPERTYSET|CREATEVIRTUALDIMENSION|CUBE|CURRENTCUBE|DEFAULT_MEMBER|DESC|DESCRIPTION|DROP|EMPTY|END|ERROR|EXCLUDEEMPTY|FALSE|FOR|FREEZE|FROM|GLOBAL|GROUP|GROUPING|HIDDEN|IGNORE|INCLUDEEMPTY|INDEX|LEAVES|LOOKUPCUBE|MEASURE|MEMBER|NEST|NO_ALLOCATION|NO_PROPERTIES|NON|NOT_RELATED_TO_FACTS|NULL|ON|OR|PAGES|PASS|POST|PROPERTIES|PROPERTY|RECURSIVE|RELATIVE|ROOT|ROWS|SCOPE|SECTIONS|SELECT|SELF|SELF_AND_AFTER|SELF_AND_BEFORE|SELF_BEFORE_AFTER|SESSION|SET|SORT|STORAGE|STRTOVAL|THIS|TOTALS|TREE|TRUE|TYPE|UNIQUE|UPDATE|USE|USE_EQUAL_ALLOCATION|USE_WEIGHTED_ALLOCATION|USE_WEIGHTED_INCREMENT|VISUAL|WHERE|WITH|XOR)\b/gi, output : '<b>$1</b>' }, // reserved words
	{ input : /\b(AddCalculatedMembers|AllMembers|Ancestor|Ancestors|Ascendants|Avg|Axis|BottomCount|BottomPercent|BottomSum|CalculationCurrentPass|CalculationPassValue|Call|Children|ClosingPeriod|CoalesceEmpty|Correlation|Count|Cousin|Covariance|CovarianceN|CrossJoin|Current|CurrentMember|DataMember|DefaultMember|Descendants|Dimension|Dimensions|Distinct|DistinctCount|DrilldownLevel|DrilldownLevelBottom|DrilldownLevelTop|DrilldownMember|DrilldownMemberBottom|DrilldownMemberTop|DrillupLevel|DrillupMember|Except|Extract|Filter|FirstChild|FirstSibling|Generate|Head|Hierarchize|Hierarchy|Ignore|Iif|Intersect|Is|IsAncestor|IsEmpty|IsGeneration|IsLeaf|IsSibling|Item|Lag|LastChild|LastPeriods|LastSibling|Lead|Level|Levels|LinkMember|LinRegIntercept|LinRegPoint|LinRegr2|LinRegSlope|LinRegVariance|LookupCube|Max|Median|Members|MemberToStr|Min|Mtd|Name|NameToSet|NextMember|NonEmptyCrossjoin|OpeningPeriod|Order|Ordinal|ParallelPeriod|Parent|PeriodsToDate|Predict|PrevMember|Qtd|Rank|RollupChildren|SetToArray|SetToStr|Siblings|Stddev|StddevP|Stdev|StdevP|StripCalculatedMembers|StrToMember|StrToSet|StrToTuple|StrToValue|Subset|Sum|Tail|ToggleDrillState|TopCount|TopPercent|TopSum|TupleToStr|Union|UniqueName|UserName|ValidMeasure|Value|Var|Variance|VarianceP|VarP|VisualTotals|Wtd|Ytd)\b/gi, output : '<f>$1</f>' }, // functions
	{ input : /([^:]|^)\-\-(.*?)(<br|<\/P)/g, output: '$1<i>--$2</i>$3' }, // comments --
	{ input : /([^:]|^)\/\/(.*?)(<br|<\/P)/g, output : '$1<i>//$2</i>$3'}, // comments //
	{ input : /\/\*(.*?)\*\//g, output : '<i>/*$1*/</i>' }, // comments /* */
	{ input : /{(.*?)(})/g, output : '<u>{$1$2</u>' }
]

Language.snippets = [
	{ input : 'iif', output : 'Iif( $0, <true>, <false>)' },
	{ input : 'member', output : 'MEMBER [Measures].[$0] AS \'\'' },
	{ input : 'select', output : 'SELECT\n  {$0} ON ROWS,\n  {} ON COLUMNS\nFROM []\nWHERE ()' },
	{ input : 'set', output : 'SET [$0] AS \'{}\'' }
]

Language.complete = [
	{ input : '\'', output : '\'$0\'' },
	{ input : '"', output : '"$0"' },
	{ input : '(', output : '\($0\)' },
	{ input : '[', output : '\[$0\]' },
	{ input : '{', output : '{$0}' }
]

Language.shortcuts = []



