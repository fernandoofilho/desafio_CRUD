from app import db
class UserHistory(db.Model):
    userEmail = db.Column(db.String(100), primary_key = True)
    userStatus = db.Column(db.String(100), nullable = False)
    userLevelAccess = db.Column(db.String(100), nullable = False)
    userCreatedBy = db.Column(db.String(100), nullable = False)
    creationDate = db.Column(db.Date, nullable = False)
    deleteDate = db.Column(db.Date, nullable = True)
    
    def __repr__(self):
        return str(self.serialize())
    
    def serialize(self):
        return {'userEmail': self.userEmail,
                'userStatus':self.userStatus,
                'userLevelAccess':self.userLevelAccess,
                'userCreatedBy': self.userCreatedBy,
                'creationDate':self.creationDate,
                'deleteDate':self.deleteDate}
        
    def is_admin(self):
        return self.userLevelAccess == '2'   
                                                                   
    def is_active(self):
        return  self.userStatus == 'active'     
                                                           
class Users(db.Model):
    userEmail = db.Column(db.String(100), primary_key=True)
    userName = db.Column(db.String(50), nullable=False)
    userSurname = db.Column(db.String(100), nullable=False)
    userKey = db.Column(db.String(160), nullable=False)
    userLevelAccess = db.Column(db.Integer(), nullable=False)
    
    def __repr__(self):
        return str(self.serialize())

    def serialize(self):
        return {
            'userEmail': self.userEmail,
            'userName': self.userName,
            'userSurname': self.userSurname,
            'userLevelAccess': self.userLevelAccess
        }
