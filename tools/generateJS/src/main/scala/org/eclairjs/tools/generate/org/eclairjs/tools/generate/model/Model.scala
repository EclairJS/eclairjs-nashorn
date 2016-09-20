package org.eclairjs.tools.generate.org.eclairjs.tools.generate.model
import  org.eclairjs.tools.generate._

case class File(fileName:String, packageName:String, comment:String, classes: List[Clazz], imports : List[String] ) {

  classes foreach (cls => cls.parent = this)

  override def  toString() = {
      val sb=new StringBuilder
      sb ++= "file="+fileName +"\n"
      imports foreach( s=>
        sb ++= "import "+s+"\n"
        )
      classes foreach( cls=> {
        sb ++= cls.toString + "\n"

      }
        )
      sb.toString()
  }

  def hasClasses=classes.length>0
}

case class Clazz(name:String, comment:String, var members: List[Member],parents:List[String],isStatic:Boolean = false, isAbstract:Boolean = false) {
  members foreach (member => member.parent = this)

  val list =removeOverloads(members)

  members = list
  var parent:File = null

  override def toString() = {
    val sb = new StringBuilder
    if (comment.length > 0)
      sb ++= comment + "\n";
    val keyword = if (isStatic) "object" else "class"
    sb ++= keyword + " " + name + "\n"

    members foreach (member => {
      sb ++= "    " + member.toString + "\n"

    })


    sb.toString()
  }

  def fullName()={ parent.packageName+"."+name}

  def constructors(): List[Method] =
  {
    val list=members.filter(member=>{
      member match {
        case method:Method => method.isConstructor()
        case _ => false
      }
    })
    list.asInstanceOf[List[Method]]

  }
  def methods (): List[Method] =
  {
    val list=members.filter(member=>{
      member match {
        case method:Method => !method.isConstructor()
        case _ => false
      }
    })
    list.asInstanceOf[List[Method]]
  }

  def methods (name:String): List[Method] =
  {
    val list=members.filter(member=>{
      member match {
        case method:Method => !method.isConstructor() && method.name==name
        case _ => false
      }
    })
    list.asInstanceOf[List[Method]]
  }


  def removeOverloads(members: List[Member]) :  List[Member]=
  {
    members.filter(member=>
      member match {
        case method:Method => method.getOverloaded() match {
          case Some(overloadedMethod) => false
          case None => true
        }
        case _ => true
      }
    )
  }

  def parentClass() : Option[Clazz] =
  {
      val optOpt=parents.map(Main.allClasses.get(_)).find(_.isDefined)
      optOpt match {
        case Some(found) => {
          if (found.isDefined)
            {
              // Ignore some superclasses
              found.get.name match {
                case "Logging" => None
                case _ => found
              }
            }
          else
            found
        }
        case None => None
      }
  }

  def parentClasses() : List[Clazz] =
  {
    val parentList= scala.collection.mutable.ListBuffer.empty[Clazz]

      var parent=parentClass()

      while (parent.isDefined)
        {
          val p=parent.get
          parentList += p
          parent=p.parentClass()
        }
    parentList.toList

  }

  def inModule():String = {
    val sparkPrefix="org.apache.spark"

    val module= if (parent.packageName.startsWith(sparkPrefix))
      parent.packageName.substring(sparkPrefix.length).replace('.','/')
      else ""
    "module:eclairjs"+ module
  }
  def module():String = {
    inModule()+"."+name
  }
}

abstract class Member
{
  def name:String
  def comment:String
  def returnType:DataType

  var parent:Clazz = null
  def isConstructor() = false


}

case class Method(name:String,var comment:String,returnType:DataType,parms:List[Parm]) extends Member
{
  override def  toString() = {
    val sb=new StringBuilder
    if (comment.length>0)
      sb++=comment+"\n    ";
    val keyword= if (isConstructor) "constructor" else "function"
    sb ++= keyword+" "+name +"("

    parms foreach( parm=> {
      sb ++= parm.name +" : "+parm.typ + ", "
    })

    sb ++= ") : "+returnType


    sb.toString()
  }

  def parmList(number:Int=0) : String =
  {
     val list= if (number==0) parms else parms.dropRight(parms.length-number)
     list.map(_.name).toArray.mkString(",")
  }

  def getParm(name:String) =
  {
    parms.find(_.name==name)
  }

  def getParmJSType(name:String):String = {
    getParm(name) match {
      case Some(parm) => parm.typ.getJSType(parm.typ.name)
      case None => "PARMNOTFOUND"
    }
  }

  def getReturnJSType():String = {
    if (returnType.name=="this.type")
      parent.name
    else
     returnType.getJSType(returnType.name)
  }

  def getReturnType():String = {
    if (returnType.name=="this.type")
      parent.name
    else
      returnType.getJSType(returnType.name)
  }


  override  def isConstructor() :Boolean = name match {
    case "<init>" | "this" => true
    case _ => false
  }

  def getDistinctName():String ={
    val methods=parent.methods(name)

    if (methods.length==1)
      return name;
    else
    {
      val others=methods.filter(_!=this)
      if (others.length==1)
      {
        val otherList=others(0).parms;
        val thisList=parms
        if (otherList.length>thisList.length)
        // shorter parmlist, don't rename
          return name;
        else if (otherList.length<thisList.length)
        {
          val lastParm=thisList(otherList.length)  // first additional parm
          return name+"with"+lastParm.name.capitalize
        }
        else if (!thisList.isEmpty){   //same length, use typename
        val lastParmType=getParmJSType(thisList.last.name)
          return name+"with"+lastParmType
        }
        else
          return name;

      }
      // for now just number, should get more intelligent
      else
      {
        val index=methods.indexOf(this)
        return name+index
      }

    }
  }

  def requiredParms()=parms.filter(!_.isOptional)
  def optionalParms()=parms.filter(_.isOptional)
  def repeatedParm()=parms.find(_.isRepeated)


  def getOverloaded():Option[Method] ={
    val methods=parent.methods(name)

    if (methods.length==1)
      {
        None
      }
    else
    {
      val others=methods.filter(_!=this)
      if (others.length==1) {
        val otherMethod=others(0)
        val otherList = otherMethod.parms;
        val thisList = parms
        if (otherList.length > thisList.length &&
          otherList.take(thisList.length) == thisList) {
          var i=0
          for ( i <- thisList.length to otherList.length-1)
            otherMethod.parms(i).isOptional=true
          return Some(otherMethod)
        }
      }

    }
    None
  }

}

case class Parm(name:String,typ:DataType, var isOptional:Boolean, isRepeated:Boolean)
{

}



  trait DataType
{
  def name: String

  def simpleName():String =name.split("\\.").last

  def refName():String =simpleName()

  def isArray(scalaName:String=name):Boolean = false

  def getJSType(scalaName:String=name):String =
  {


    val simpleName=scalaName.split("\\.").last


    if (simpleName.length==1) // must be a type parm
      return "object"

    simpleName match {
      case "Boolean" => "boolean"
      case "Long" | "Int"  | "Double"| "Float" | "Byte"=> "number"
      case "String" => "string"
      case "List" | "JList"=> "[]"
      case "Unit"   => "undefined"
      case "Any" | "AnyRef"   => "object"

      case _ =>simpleName
    }

  }

  def isAbstract(scalaName:String=name):Boolean =
  {
    val jsType=getJSType(scalaName)
    jsType match {
          // special cases
      case "RDD" | "JavaRDD" => false

      case _ =>
        val clsOpt=Main.allClasses.get(jsType)
        clsOpt match {
          case Some(cls) => cls.isAbstract
          case _ => false
        }
    }
  }



  def isVoid(): Boolean =
  {
    val simpleName=name.split("\\.").last
    return "Unit"==simpleName
  }

  def isSparkClass(scalaName:String=name): Boolean =
  {
    if (scalaName=="this.type")
      return true
    val simpleName=scalaName.split("\\.").last
    var rx="Long|Int|Double|Float|Byte|List|JList|Unit|Any|AnyRef|String|Boolean|Array|Seq".r
    rx.findFirstMatchIn(simpleName).isEmpty
  }
}
case class SimpleType(name:String) extends DataType
case class ExtendedDataType(name:String,referenceType:String) extends DataType
{
  override def getJSType(scalaName:String=name):String =
  {
    scalaName match {
      case "Option" =>  super.getJSType(referenceType)
      case "List" | "JList" | "Array" | "Seq" =>  super.getJSType(referenceType) + "[]"
      case _ => super.getJSType(name)
    }
  }
  override def isSparkClass(scalaName:String=name): Boolean =
  {
    scalaName match {
      case "Option" | "List" | "JList" | "Array"  | "Seq" =>  super.isSparkClass(referenceType)
      case _ =>  super.isSparkClass(scalaName)
    }

  }
  override def isArray(scalaName:String=name):Boolean = {
    scalaName match {
      case "List" | "JList" | "Array"  | "Seq" =>  true
      case _ => false
    }

  }
  override def refName():String ={
    name match {
      case "Option" | "List" | "JList"| "Array"  | "Seq" =>  referenceType.split("\\.").last
      case _ =>  super.refName()
    }

  }


}
case class FunctionDataType(name:String,parms:List[DataType],returnType:DataType) extends DataType
{
  override def getJSType(scalaName:String=name):String = "func"

}
