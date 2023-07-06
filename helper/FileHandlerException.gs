package training.util.filehandler.helper

/**
 * author : Aravind R Pillai
 * date   : 14 Nov 2022
 * desc   : Exception class for file handler framework
 */
class FileHandlerException extends Exception {

  construct(msg : String){
    super(msg)
  }

  construct(e: Exception){
    super(e)
  }

  construct(msg: String, e:Exception){
    super(msg, e)
  }

  construct(){
    super()
  }

}