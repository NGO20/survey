#! /usr/bin/env sh
csv_dir=/opt/mysql/backups
csv_file=${csv_dir}/survey.txt
dest_gbk=/usr/share/nginx/survey/survey-gbk.csv
dest_utf8=/usr/share/nginx/survey/survey-utf8.csv
mysqldump -uroot -p123456 -t --tab=${csv_dir} --fields-terminated-by=, --fields-enclosed-by='"' --lines-terminated-by=0x0d0a ngo20map survey
rm ${dest}
cp ${csv_file} ${dest_utf8}
iconv -f utf-8 -t gbk ${csv_file} > ${dest_gbk}
