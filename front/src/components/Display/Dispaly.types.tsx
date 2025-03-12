interface FlatListTableProps {
    data:{
        idSubject: string; 
        description: string;
        
    }[],
    onDeleteSuccess?: ()=>  void;
}