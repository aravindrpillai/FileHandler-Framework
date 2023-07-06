Introduction
Framework helps to read and write data from a file. 
The framework has an abstract class which has 3 mandatory functions that we need to extend in our child class.
1.	speficyFilePath() : String
	this is the function where we need to define our actual file path
2.	handleSuccess(file : File)
	this is the function where we can write our logic to handle success. The processed file will be passed down to this function as parameter.
3.	handleFailure(file : File, e : Exception)
	this is the function where we can write our logic to handle failure. This function brings 2 parameters – the file and the exception.
NOTE : file may be null here

Part 1 :- Writing to file
XML Configuration
First of all you need to create an xml file in the below format.
 
Each <field> tag represents each item of the line and the entire fields must be wrapped inside the <fields> tag.
1.	delimitor : the value defined for the delimitor will come as the  separator between 2 items in a line. E.g. For a CSV file, we need to give the value as “,”
2.	responsive : 
	If true : there won’t be any extra spaces left after the each field value. Also if this is true, fieldSize, trimeValueIfExceedsSize and justify will be ignore and you can even skip those from the XML.
	If false: the framework looks for the fieldSize, trimeValueIfExceedsSize and justify values on each field to format the content of the line.

3.	fieldSize : This sets a default size limit for each field value. 
For example: if the Field_1 value is “Hello” and the size is 20, then after “Hello”, the framework will append the word with 15 empty spaces- like : “Hello               “ 
4.	trimValueIfExceedsSize: 
	If True : framework will trim the value to the size specified if the value length exceeds the size specified.
	If False: the framework will throw an exception
5.	Justify : Field holds 3 values  left, center and right. Based on the value, the content will be aligned in the file.

Class Configuration
After configuring the fields.xml file, create a new class and extend FileCreationBase class.
Once the class is created, override all the methods from the abstract class.
specifyFieldsXMLPath()  Return the path of fields.xml here
speficyFilePath(), handleSuccess(file : File) and handleFailure(file : File, e : Exception)  are explained in the starting. 

There is one optional function that we can override to specify the content of the file. 
Function name is - specifyFileContent() : List<List<Object>> 
If this function is overridden, then the file content must be returned as List<List<String>>.
The outer list represents each line and the inner list represents the items of each line, and this must be in the same order of fields.xml

Now initialize the custom class and call 
new MyCustomClass().start()

class FileCreationTest extends integrations.util.filehandler.core.FileCreationBase {

  function specifyFieldsXMLPath() : String {
         return ConfigurationFolder.concat("gsrc/integrations/util/filehandler/fields.xml")
  }

  override function speficyFilePath() : String {
         return "C:/filehandler/processing/myfile.txt"
  }

  override function handleSuccess(file : File) {
         var moved = super.move(file, "C:/filehandler/processed/myfile.txt")
  }

  protected override function handleFailure(file : File, e : Exception) {
         if(file?.exists()){
           super.delete(file)
         }
  }

  function specifyFileContent() : List<List<Object>> {
         return {
             {"Aravind Pillai", 19, 2345.99, "House No 1", null, "691306"},
             {"Derik Sam", 14, 2234, "House Number 2", "Street Name", "889900"},
             {"Sukanya V", 15, 3453, "Flat number F1", "Sabari Gardens", "785412"}
         }
  }
}

To trigger  new FileCreationTest().start()
Or instead of specifying the content inside specifyFileContent(), you can directly pass the object to the start method, like
var content = {
        {"Aravind Pillai", 19, 2345.99, "House No 1", null, "691306"},
        {"Sukanya V", 15, 3453, "Flat number F1", "Sabari Gardens", "785412"}
    }

and then call the start method with the content as parameter  new FileCreationTest().start(content)


















Part 2 :- Reading a file
To read a file, we must create a new class and extend FileReaderBase.
The code functions needs to be overridden along with 2 other functions which are, 
1.	processFile(file : File) : File
This function gives the file and we can process it inside the processFile function(). If we don’t need to process it here, you can skip this function from the custom class.
2.	processEachLine(line: String, index:int)
This function will be called count(lines) times, with each line as the input parameter. 
Note: Control will come to this function only if the processFile() function returns a file. So in case if we need to skip this function, you can return null from the processFile() function. 
By default, the framework returns the file from the above function.

To trigger, just initialize the class and call start() method.


























class FileFetchTest extends FileReaderBase {


  override function speficyFilePath() : String {
    return "C:/aravind/filehandler/processing/myfile.txt"
  }


  override function processFile(file : File)  : File {
    print("inside file function : "+file.AbsolutePath)
    return file
  }


  override function processEachLine(line : String, lineIndex:int) {
    print(lineIndex+" -- "+line)
  }


  override function handleSuccess(file : File) {
    var moved = super.move(file, "C:/aravind/filehandler/processed/myfile.txt")
    if (moved) {
      
    }
  }


  override function handleFailure(file : File, e : Exception) {
    if(file?.exists()){
      super.delete(file)
    }
  }


}

To trigger:  new FileFetchTest().start()

Example : Output file with specified spaces between line items:
 
![image](https://github.com/aravindrpillai/FileHandler-Framework/assets/24803891/52976309-cb8f-48a6-b493-78cc70aa08da)
