#!/usr/bin/env bash

#
# Copyright 2015 IBM Corp.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#



#
# Check for spark jar
#
if [ -z "$SPARK_HOME" ]; then
    echo "Need to set SPARK_HOME to the location of the Spark distribution"
    exit 1
fi

#
# Check for eclairJS-nashorn jar
#
if [ -z "$ECLAIRJS_JAR" ]; then
	export ECLAIRJS_JAR=./target/eclairjs-nashorn-0.6-SNAPSHOT-jar-with-dependencies.jar
fi

#
# Check for java 1.8
#
if [[ -n "$JAVA_HOME" ]] && [[ -x "$JAVA_HOME/bin/java" ]];  then
		#echo found java executable in JAVA_HOME
		_java="$JAVA_HOME/bin/java"
elif type -p java > /dev/null; then
	#echo found java executable in PATH
	_java=java

else
	echo "Java 8 required, please Java 1.8.0_60 or greater."
	exit 1
fi

if [[ "$_java" ]]; then
	version=$("$_java" -version 2>&1 | awk -F '"' '/version/ {print $2}')
	#echo version "$version"

	if [[ "$version" < "1.8.0_60" ]]; then
	    vendor=$("$_java" -version 2>&1 | awk -F '"' '/IBM/ {print $0}')
	    if [[ "$vendor" ]]; then
	       build=$(echo $vendor | cut -d' ' -f5 | cut -d',' -f1)
	       ibmVersion=$(echo $vendor | cut -d' ' -f7)
	      # echo build "$build"
	      # echo ibmVersion "$ibmVersion"
	      # echo vendor "$vendor"
	       if [[ "$version" < "1.8.0" ]]; then
	         echo IBM java version 1.8.0 is required.
	        	 exit 1
	       fi
		else
		   echo java version greater than 1.8.0_59 is required.
		   exit 1
	    fi
	fi
fi

# Use > 1 to consume two arguments per pass in the loop (e.g. each
# argument has a corresponding value to go with it).
# Use > 0 to consume one or more arguments per pass in the loop (e.g.
# some arguments don't have a corresponding value to go with it such
# as in the --default example).
# note: if this is set to > 0 the /etc/hosts part is not recognized ( may be a bug )
options=" ";
proargs=" ";
while [[ $# > 0 ]]
do
key="$1"

case $key in
	-*)
    options="$options $1 $2";
    shift # past argument
    ;;
    *)
    proargs+=" $1"
    ;;
esac
shift # past argument or value
done



#
#  from spark-class.sh
#


if [ -z "${SPARK_HOME}" ]; then
  export SPARK_HOME="$(cd "`dirname "$0"`"/..; pwd)"
fi

. "${SPARK_HOME}"/bin/load-spark-env.sh

# Find the java binary
if [ -n "${JAVA_HOME}" ]; then
  RUNNER="${JAVA_HOME}/bin/java"
else
  if [ `command -v java` ]; then
    RUNNER="java"
  else
    echo "JAVA_HOME is not set" >&2
    exit 1
  fi
fi

# Find assembly jar
SPARK_ASSEMBLY_JAR=
if [ -f "${SPARK_HOME}/RELEASE" ]; then
  ASSEMBLY_DIR="${SPARK_HOME}/lib"
else
  ASSEMBLY_DIR="${SPARK_HOME}/assembly/target/scala-$SPARK_SCALA_VERSION"
fi

GREP_OPTIONS=
num_jars="$(ls -1 "$ASSEMBLY_DIR" | grep "^spark-assembly.*hadoop.*\.jar$" | wc -l)"
if [ "$num_jars" -eq "0" -a -z "$SPARK_ASSEMBLY_JAR" -a "$SPARK_PREPEND_CLASSES" != "1" ]; then
  echo "Failed to find Spark assembly in $ASSEMBLY_DIR." 1>&2
  echo "You need to build Spark before running this program." 1>&2
  exit 1
fi
if [ -d "$ASSEMBLY_DIR" ]; then
  ASSEMBLY_JARS="$(ls -1 "$ASSEMBLY_DIR" | grep "^spark-assembly.*hadoop.*\.jar$" || true)"
  if [ "$num_jars" -gt "1" ]; then
    echo "Found multiple Spark assembly jars in $ASSEMBLY_DIR:" 1>&2
    echo "$ASSEMBLY_JARS" 1>&2
    echo "Please remove all but one jar." 1>&2
    exit 1
  fi
fi

SPARK_ASSEMBLY_JAR="${ASSEMBLY_DIR}/${ASSEMBLY_JARS}"

LAUNCH_CLASSPATH="$ECLAIRJS_JAR:$SPARK_ASSEMBLY_JAR"

#
#  END from spark-class
#

string='My long string';

#if [[ $options != *"-Dlog4j.configuration="* ]]
#then
#  if [ -z "$options" ]; then
#    option=" ";
#  fi
#  options="$options -Dlog4j.configuration=file:\"./src/main/resources/conf/log4j.prop\"";
#fi

#
# start the REPL
#
#
#


exec java -cp "$LAUNCH_CLASSPATH" $options org.eclairjs.nashorn.server.HttpServer  $proargs

