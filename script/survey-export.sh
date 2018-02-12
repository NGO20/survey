#! /usr/bin/env sh
csv_dir=/opt/mysql/backups
csv_file=${csv_dir}/survey.txt
dest=/usr/share/nginx/survey/survey-1b3df2349a.csv
mysqldump -uroot -p123456 -t --tab=${csv_dir} --fields-terminated-by=, --fields-enclosed-by='"' --lines-terminated-by=0x0d0a ngo20map survey
rm ${dest}
iconv -f utf-8 -t gbk ${csv_file} > ${dest}
