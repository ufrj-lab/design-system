#!/bin/bash

printf "\033c"

_root_path=$1
_components_path="$1components"

_os=$(uname -s)
if [[ $_os == Darwin ]]; then
	_flag_sed_os='-En' # macOs
else
	_flag_sed_os='-rn' # linux
fi

_components_sed="s~$_components_path/(.*)~\1~p"
_components_array=($(find $_components_path -mindepth 1 -maxdepth 1 -type d | sed $_flag_sed_os "$_components_sed" ))
_components_length=${#_components_array[@]}

function printfInput {
	printf "$1\n"
	read _return
}

function setName {
	printfInput "$1"
	if [[ $_return == '' ]]; then
		setName "Este campo é obrigatorio! Por favor forneça o nome ou cancele [Crtl + c]:"
	fi
	for (( _count=0; _count<$_components_length; _count++ ))
	do
		_item=${_components_array[$_count]}
		if [[ $_return == $_item ]]; then
			setName "O componente $_return já exist! Forneça um nome novo. O Padrão é \"[a-z]+[0-9]{0,1}\":"
			break
		fi
	done
	if [[ ! $_return =~ ^[a-z]+[0-9]{0,1}$ ]]; then
		setName "Nome invalido! Forneça um nome valido! O Padrão é \"[a-z]+[0-9]{0,1}\":"
	fi
	_name=$_return
	clear
}
setName "Qual o nome do novo componente? Exemplo: title1"

function setVersion {
	printfInput "$1"
	if [[ $_return == '' ]]; then
		_return="0.0.0"
	fi
	if [[ ! $_return =~ ^[0-9]*\.[0-9]*\.[0-9]*$ ]]; then
		setVersion "Versão invalida! Forneça uma versão valida! O Padrão é \"[0-9].[0-9].[0-9]\":"
	fi
	_version=$_return
	clear
}
setVersion "Qual a versão? Default: 0.0.0"


if [[ $_os == Darwin ]]; then
	_flag_sed_os='-E' # macOs
else
	_flag_sed_os='-r' # linux
fi


function createComponent {
	_example_dir="$_components_path/example"
	_new_dir="$_components_path/$_name"
	_new_tests_dir="$_new_dir/__tests__"
	_new_src_dir="$_new_dir/src"

	_tmp_new_dir="$_new_dir/tmp"
	_public_new_dir="$_new_dir/public"
	_node_new_dir="$_new_dir/node_modules"
	_lib_new_dir="$_new_dir/lib"


	cp -r $_example_dir $_new_dir

	rm -fr $_tmp_new_dir $_public_new_dir $_node_new_dir $_lib_new_dir

	mv $_new_tests_dir/example.test.js $_new_tests_dir/$_name.test.js

	_change_name="s~\"name\": \".*\"~\"name\": \"@ufrj/mnv-$_name\"~"
	cat $_new_dir/package.json | sed "$_change_name" >> $_new_dir/package.json.new
	rm $_new_dir/package.json
	mv $_new_dir/package.json.new $_new_dir/package.json

	_change_version="s~\"version\": \".*\"~\"version\": \"$_version\"~"
	cat $_new_dir/package.json | sed "$_change_version" >> $_new_dir/package.json.new
	rm $_new_dir/package.json
	mv $_new_dir/package.json.new $_new_dir/package.json


	_change_start="s~--startPath example/\"~--startPath $_name/\"~"
	cat $_new_dir/package.json | sed "$_change_start" >> $_new_dir/package.json.new
	rm $_new_dir/package.json
	mv $_new_dir/package.json.new $_new_dir/package.json

	_uppercase=$(echo $_name | tr '[:lower:]' '[:upper:]')
	_firstchar_uppercase="${_uppercase:0:1}"
	_firstchar="${_name:0:1}"
	_class_name="Mnv$_firstchar_uppercase${_name#"$_firstchar"}"

	_change_class_name="s~MnvExample~$_class_name~"
	cat $_new_src_dir/index.js | sed "$_change_class_name" >> $_new_src_dir/index.js.new
	rm $_new_src_dir/index.js
	mv $_new_src_dir/index.js.new $_new_src_dir/index.js

	_file_name="mnv$_firstchar_uppercase${_name#"$_firstchar"}"
	_change_file_name="s~mnvExample~$_file_name~"
	cat $_new_dir/index.html | sed "$_change_file_name" >> $_new_dir/index.html.new
	rm $_new_dir/index.html
	mv $_new_dir/index.html.new $_new_dir/index.html


	_change_main_file="s~\"main\": \".*\"~\"main\": \"lib/mnv$_firstchar_uppercase${_name#"$_firstchar"}.js\"~"
	cat $_new_dir/package.json | sed "$_change_main_file" >> $_new_dir/package.json.new
	rm $_new_dir/package.json
	mv $_new_dir/package.json.new $_new_dir/package.json

	_change_define_name="s~mnv-example~mnv-$_name~"
	cat $_new_src_dir/index.js | sed "$_change_define_name" >> $_new_src_dir/index.js.new
	rm $_new_src_dir/index.js
	mv $_new_src_dir/index.js.new $_new_src_dir/index.js

 	_change_tag="s~^(.*)<mnv-example>(.*)</mnv-example>(.*)$~\1<mnv-$_name>\2</mnv-$_name>\3~"
	cat $_new_dir/index.html | sed $_flag_sed_os "$_change_tag" >> $_new_dir/index.html.new
	rm $_new_dir/index.html
	mv $_new_dir/index.html.new $_new_dir/index.html

	node helpers/updateGreenKeeper.js > greenkeeper.json.new
	rm greenkeeper.json
	mv greenkeeper.json.new greenkeeper.json


	$(cd $_new_dir)
}

createComponent

printf "Parabens! Componente $_name-v$_version criado com sucesso!\n"

