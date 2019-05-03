SET SESSION group_concat_max_len = 10000000;

SELECT CONCAT('{"type":"text_date_language"
				,"texts":[', 
		
        GROUP_CONCAT('{',
		  '"id":'   , '"', id   , '"', ',' 
		  '"name":'   , '"', name   , '"', ',' 
		  '"language":', '"', language, '"', ',' 
		  '"start":', '"', start, '"', ',' 
		  '"end":', '"', end, '"',',',  
		  case isnull(point) when true then ''  else CONCAT('"geometry":',ST_AsGeoJSON(point), ',') end,
		  '"compilationPlace":', '"', compilationPlace, '"', ',' 
		  '"shelfmark":', '"', shelfmark, '"', ',' 
		  '"overview":', '"', overview, '"', ',' 
          '"adaptation":', '"', adaptation, '"', ',' 
          '"integrated":', '"', integrated, '"', ',' 
          '"fragment":', '"', fragment, '"', ',' 
		  '"compilationDate":', '"', compilationDate, '"
          }'), ']}') 
          
          AS j FROM
    pseudo_turpin;