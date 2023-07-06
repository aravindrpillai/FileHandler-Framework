/**
 * WRITE DATA TO FILE
 * -------------------*
 * Configuration
 * Step 1: Create a fields.xml file and place it somewhere inside the application
 * Step 2: Create a new class which extends "FileCreationBase"
 * Seep 3: Implement the below functions
 *          1. specifyFieldsXMLPath - return the `fields.xml` location from this function
 *          2. speficyFilePath      - return the file path from this function
 *          3. handleSuccess        - write your on success logic here
 *          4. handleFailure        - write your on failure logic here
 *          5. specifyFileContent   - return the content of file as List<List<String>>
 *Step 4: Initialise your configuration class (see code below) and call start() method
 *        Note : start() has 2 flavours
 *          1. without parameter : in this case, you need to define specifyFileContent() function within your configuration class
 *          2. with parameter    : in this case, instead of defining specifyFileContent() function, u can directly
 *                                  call start() method by passing the file content to  this function
 *
 */
new FileCreationTest().start()

/*=============================================================================================================================*/

/**
 * READ DATA FROM FILE
 * --------------------*
 * Configuration
 * Step 1: Create a new class which extends "FileReaderBase"
 * Seep 2: Implement the below functions
 *          1. speficyFilePath      - return the file path from this function
 *          2. handleSuccess        - write your on success logic here
 *          3. handleFailure        - write your on failure logic here
 *          4. processFile          - your code to process the file goes here,
 *                                    if you need to process it line by line, make use of the below function.
 *          4. processEachLine      - function gives each line and its index of the file.
 *                                    NOTE: control will come here only when the processfile() function returns the file.
 *                                    In case, if processFile() returns null, control wont come here.
 *                                    By default, the framework returns the file from processFile()
 *Step 3: Initialise your configuration class (see code below) and call start() method
 *
 */
new FileFetchTest().start()