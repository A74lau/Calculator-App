from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
api = Api(app)


class calculations(Resource):
    def __init__(self):
        self.results = []
    
    def post(self, formula):
        self.results = self.compute(formula)
        return self.results
    
 
    def compute(self, formula):
        #----------------------------------------------------------------
        
        #Method 1
        # result = eval(formula)

        #return result
        
        #----------------------------------------------------------------
        
        #Method 2
        ops = {'+','-','*','d'}
        nums = {str(x) for x in range(10)}

        curr_num = 0
        last_num = 0
        #set the default operator to addition
        op = '+'
        result = 0

        for i in range(len(formula)):
            char = formula[i]

            #if it is a digit
            if (char in nums):
                curr_num  = curr_num*10 + int(char)
            
            #if it is a operator
            if(char in ops or i == len(formula)-1):
                if (op == "+"):
                    result += last_num
                    last_num = curr_num
                elif (op == "-"):
                    result += last_num
                    last_num = -curr_num
                elif (op == "*"):
                    last_num = curr_num * last_num
                elif (op == "d"):
                    last_num = int(last_num / curr_num)
                
                #set the op to the operator
                op = char
                #reset curr num after we encouter an operator
                curr_num = 0
        
        return result + last_num
         
api.add_resource(calculations,'/<string:formula>')


if __name__ == '__main__':
    app.run(debug = True)