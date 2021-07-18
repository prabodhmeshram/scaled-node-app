const producerService = require("../../services/producerService")

const fs = require("fs");
jest.mock('fs', () => {
  return {
    promises: {
    writeFile: jest.fn()
    }
  };
});

describe('Methods', () => {
    describe('putData', () => {
        beforeEach(() => {
            jest.resetAllMocks();
         });

        it('should throw error when data not present', ()=>{
            expect(producerService.putData([])).rejects.toThrow('Invalid data');
        })

        it('should put data for single entry', async()=>{
            await producerService.putData([{'key':'value'}])
            expect(fs.promises.writeFile).toHaveBeenCalledTimes(1);
        })

        it('should create multiple files for more data', async()=>{
            const data = [{},{},{},{},{},{}];
            await producerService.putData(data)
            expect(fs.promises.writeFile).toHaveBeenCalledTimes(3);
        })
    })
    
})
